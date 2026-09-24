'use client'
// The ElevenLabs Conversational AI session. This file is the only importer
// of @elevenlabs/react (which carries LiveKit); VoicePanel loads it as a
// dynamic chunk after the visitor's first gesture or an idle window, so the
// SDK never rides the initial bundle. Once loaded it stays mounted, idle,
// for the life of the panel and exposes an imperative handle: that way the
// mic tap calls startSession synchronously inside the gesture, which is
// what iOS Safari needs before it will let audio play.
//
// Two kinds of session:
//   voice — a live WebRTC call (LiveKit). The mic stays open, full duplex:
//           SARDAR listens and replies in real time and the visitor can
//           interrupt by speaking. ElevenLabs' own turn-taking handles it;
//           nothing here mutes either side.
//   text  — the SDK's text-only conversation over a plain WebSocket, for a
//           visitor who types without starting a call. Typing during a call
//           goes into the call instead.
//
// Nothing is overridden at start: the agent's own prompt, first message,
// voice and language settings apply as configured on elevenlabs.io. Its
// Security tab only permits the "Agent language" override, and any other
// override (or an undeclared dynamic variable) makes the server drop the
// room right after it opens. Language detection is configured on the agent,
// so even that override is not sent.
//
// A session never idles open: after SILENCE_MS with no sound or text from
// either side the panel shows "Still there?", and PROMPT_MS later the
// session ends; HARD_CAP_MS ends any session outright. Every end path stops
// the media tracks the SDK attached and releases the microphone.
import { useEffect, useRef } from 'react'
import { ConversationProvider, useConversation } from '@elevenlabs/react'
import { lipsync } from './store'

export type SessionKind = 'voice' | 'text'
export type VoiceStatus = 'idle' | 'connecting' | 'connected' | 'error'

/** What SardarClient uses to route chip taps into a live conversation. */
export type VoiceApi = {
  /** Send typed text into the live conversation. */
  send: (text: string) => void
}

/** The panel's imperative handle. Every method is safe to call at any time. */
export type VoiceHandle = {
  /** Start a live call. Call it synchronously from the tap. With `first`,
   *  that line is sent as soon as the call is up so the reply is spoken; if
   *  the call cannot start (mic denied), it falls back to a text session
   *  carrying the same line. */
  startCall: (first?: string) => void
  /** Start a text-only session and send `first` as soon as it is up. */
  startText: (first: string) => void
  /** Send a line into whichever session is live (no-op when none is). */
  send: (text: string) => void
  /** Hang up: endSession(), stop every track, release the mic. */
  end: (why: string) => void
  /** Something happened on the visitor's side (typing): resets the silence clock. */
  touch: () => void
  /** Visitor mic level, 0..1, for the panel's meter (0 outside a call). */
  inputLevel: () => number
}

export type VoiceSessionProps = {
  agentId: string
  onHandle: (handle: VoiceHandle | null) => void
  onTranscript: (role: 'you' | 'ai', text: string) => void
  onSpeaking: (speaking: boolean) => void
  /** `idle` with a detail means the other side or a timer ended it. */
  onStatus: (status: VoiceStatus, detail?: string) => void
  /** Which kind of session is up, or null. */
  onKind: (kind: SessionKind | null) => void
  /** Send API for the parent while a session is connected, else null. */
  onApi: (api: VoiceApi | null) => void
  /** The "Still there?" prompt text while it shows, else null. */
  onPrompt: (text: string | null) => void
}

const TAG = '[sardar/voice]'
/** Silence from both sides before the "Still there?" prompt. */
const SILENCE_MS = 90_000
/** How long the prompt shows before the session ends. */
const PROMPT_MS = 10_000
/** No session outlives this. */
const HARD_CAP_MS = 10 * 60_000
/** Mic level (0..1) above which the visitor counts as making sound. */
const SOUND_LEVEL = 0.04
const STILL_THERE = 'Still there? The call ends in 10 seconds unless you say or type something.'

/** Stop every media track the SDK attached to the page and release the mic.
 *  The SDK stops its own tracks on close; this is the belt to that brace, so a
 *  reply can never keep playing after the session is gone. */
function releaseAudio() {
  if (typeof document === 'undefined') return
  document.querySelectorAll('audio').forEach((el) => {
    const src = el.srcObject
    if (!(src instanceof MediaStream)) return // not one of the SDK's
    src.getTracks().forEach((t) => t.stop())
    el.pause()
    el.srcObject = null
  })
}

export default function VoiceSession(props: VoiceSessionProps) {
  return (
    <ConversationProvider>
      <Session {...props} />
    </ConversationProvider>
  )
}

function Session(props: VoiceSessionProps) {
  const { agentId, onHandle, onTranscript, onSpeaking, onStatus, onKind, onApi, onPrompt } = props

  // Everything below reads through refs: useConversation returns a new object
  // every render, and callbacks registered with the SDK must not go stale.
  const kind = useRef<SessionKind | null>(null)
  const ending = useRef(false)          // we asked for the end; a start failure now is not an error
  const pending = useRef(false)         // startSession called, no status from the SDK yet
  const firstLine = useRef<string | null>(null) // sent once connected (chip or typed opener)
  const voiceFallback = useRef<string | null>(null) // a chip's line to retry as text if the call fails
  const lastActivity = useRef(0)
  const promptedAt = useRef<number | null>(null)
  const startedAt = useRef(0)
  const watchdog = useRef<number | null>(null)

  const stopWatchdog = () => { if (watchdog.current !== null) { window.clearInterval(watchdog.current); watchdog.current = null } }
  const clearPrompt = () => { if (promptedAt.current !== null) { promptedAt.current = null; onPrompt(null) } }
  const touch = () => { lastActivity.current = Date.now(); clearPrompt() }

  const conv = useConversation({
    onMessage: ({ message, role }) => {
      touch()
      onTranscript(role === 'user' ? 'you' : 'ai', message)
    },
    onModeChange: ({ mode }) => {
      const speaking = mode === 'speaking'
      if (speaking) touch()
      onSpeaking(speaking)
    },
    onStatusChange: ({ status }) => {
      if (status === 'connected') pending.current = false
      if (status === 'connecting' || status === 'connected') onStatus(status)
      // "disconnecting" / "disconnected" are reported from onDisconnect, which
      // fires last and carries the reason.
    },
    onError: (message, context) => {
      // Surfaced so the next failure is diagnosable from the console.
      console.warn(TAG, 'error:', message, context ?? '')
      pending.current = false
      if (!ending.current && kind.current === 'voice' && voiceFallback.current) {
        // A chip asked for a spoken reply but the call could not start (most
        // often the mic was refused): ask the same thing over text instead.
        const line = voiceFallback.current
        voiceFallback.current = null
        console.warn(TAG, 'call failed to start, falling back to text:', message)
        start('text', line)
        return
      }
      if (ending.current) {
        // We hung up while it was still connecting and the start failed:
        // there is no session to disconnect, so settle to idle here.
        ending.current = false
        kind.current = null
        onKind(null)
        onStatus('idle')
        return
      }
      onStatus('error', message)
    },
    onDisconnect: (details) => {
      stopWatchdog()
      clearPrompt()
      releaseAudio()
      voiceFallback.current = null
      const ctx = 'context' in details && details.context ? details.context : undefined
      const message = details.reason === 'error' ? details.message : undefined
      console.warn(TAG, 'disconnected:', details.reason, message ?? '', ctx ?? '')
      kind.current = null
      ending.current = false
      pending.current = false
      onSpeaking(false)
      onApi(null)
      onKind(null)
      // "user" is us (tap, Escape, silence, cap); "agent" is SARDAR hanging
      // up; "error" is the server dropping the room.
      if (details.reason === 'error') onStatus('error', message)
      else onStatus('idle', details.reason === 'agent' ? 'SARDAR ended the call.' : undefined)
    },
  })
  const convRef = useRef(conv)
  useEffect(() => { convRef.current = conv }) // first effect, so the ones below read the latest

  const end = (why: string) => {
    const c = convRef.current
    stopWatchdog()
    clearPrompt()
    if (c.status === 'connected' || c.status === 'connecting' || pending.current) {
      ending.current = true
      console.warn(TAG, 'ending session:', why)
      c.endSession()
    }
    releaseAudio()
  }

  // Silence and hard-cap watchdog, ticking once a second while connected.
  const startWatchdog = () => {
    stopWatchdog()
    startedAt.current = Date.now()
    touch()
    watchdog.current = window.setInterval(() => {
      const c = convRef.current
      if (c.status !== 'connected') return
      const now = Date.now()
      if (now - startedAt.current >= HARD_CAP_MS) { end(`hard cap of ${HARD_CAP_MS / 60000} minutes reached`); return }
      // Sound from the visitor's mic counts as activity, as does the agent
      // speaking (onModeChange) and any transcript line (onMessage).
      if (kind.current === 'voice' && c.getInputVolume() > SOUND_LEVEL) { touch(); return }
      const quiet = now - lastActivity.current
      if (promptedAt.current === null) {
        if (quiet >= SILENCE_MS) { promptedAt.current = now; onPrompt(STILL_THERE); console.warn(TAG, `silent for ${SILENCE_MS / 1000}s — prompting`) }
      } else if (now - promptedAt.current >= PROMPT_MS) {
        end(`no reply to "Still there?" within ${PROMPT_MS / 1000}s`)
      }
    }, 1000)
  }

  const start = (want: SessionKind, first: string | null) => {
    const c = convRef.current
    // A text session gives way to a call, and vice versa: end it first. The
    // provider drops the old session's callbacks once the new start begins.
    if (c.status === 'connected' || c.status === 'connecting' || pending.current) {
      if (kind.current === want) return
      console.warn(TAG, `switching ${kind.current} → ${want}`)
      c.endSession()
      releaseAudio()
    }
    ending.current = false
    pending.current = true
    kind.current = want
    firstLine.current = first
    voiceFallback.current = want === 'voice' ? first : null
    onKind(want)
    onStatus('connecting')
    try {
      if (want === 'voice') {
        // Full duplex: no micMuted, no overrides, no dynamic variables. The
        // SDK asks for the mic itself; called synchronously from the tap so
        // the gesture still covers the permission prompt and audio playback.
        c.startSession({ agentId, connectionType: 'webrtc' })
      } else {
        // textOnly at the top level picks the SDK's TextConversation; the
        // websocket transport is the only one it supports.
        c.startSession({ agentId, connectionType: 'websocket', textOnly: true })
      }
    } catch (err) {
      console.warn(TAG, 'could not start session:', (err as Error)?.message)
      pending.current = false
      if (want === 'voice' && first) { voiceFallback.current = null; start('text', first); return }
      kind.current = null
      onKind(null)
      onStatus('error', (err as Error)?.message)
    }
  }

  // Hand the panel its handle once, on mount; it never changes identity.
  useEffect(() => {
    const handle: VoiceHandle = {
      startCall: (first) => start('voice', first ?? null),
      startText: (first) => start('text', first),
      send: (t) => { const c = convRef.current; if (c.status !== 'connected') return; touch(); c.sendUserMessage(t) },
      end,
      touch,
      inputLevel: () => { const c = convRef.current; if (kind.current !== 'voice' || c.status !== 'connected') return 0; try { return c.getInputVolume() } catch { return 0 } },
    }
    onHandle(handle)
    return () => onHandle(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onHandle])

  // Connected: arm the watchdog, hand out the send API, flush a text
  // session's first line, and feed the mouth from the SDK's output meter.
  useEffect(() => {
    if (conv.status !== 'connected') return
    startWatchdog()
    onApi({ send: (t) => { touch(); convRef.current.sendUserMessage(t) } })
    voiceFallback.current = null // connected: no fallback needed
    if (firstLine.current) { const t = firstLine.current; firstLine.current = null; convRef.current.sendUserMessage(t) }
    if (kind.current === 'voice') lipsync.attachVolume(() => convRef.current.getOutputVolume())
    return () => { lipsync.detachVolume(); onApi(null) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conv.status])

  // Unmount (the panel going away): hang up and release everything.
  useEffect(() => () => {
    stopWatchdog()
    convRef.current.endSession()
    releaseAudio()
  }, [])

  return null
}
