'use client'
// The ElevenLabs Conversational AI session. This file is the only importer
// of @elevenlabs/react (which carries LiveKit), and VoicePanel loads it
// dynamically on the visitor's first tap, so the SDK never rides the initial
// bundle. It owns one session for the life of the panel and reports
// everything upward through callbacks; SardarClient keeps the transcript.
//
// Two kinds of session, chosen by the panel from what the visitor did first:
//   voice — WebRTC (LiveKit). Push-to-talk mutes the mic unless held.
//   text  — the SDK's text-only conversation over a plain WebSocket. Typed
//           questions never ride a voice session (which would mean opening a
//           LiveKit room, asking for the mic and streaming silence).
//
// Nothing is overridden at start: the agent's own prompt, first message,
// voice and language settings apply as configured on elevenlabs.io. Its
// Security tab only permits the "Agent language" override, and any other
// override (or an undeclared dynamic variable) makes the server drop the
// room right after it opens. Language detection is configured on the agent,
// so even that override is not sent.
//
// The session never outlives the visitor's attention:
//   - releasing the mic silences whatever the agent is saying right now
//     (the reply to what was just said still plays), and if nothing else
//     is said or typed within IDLE_END_MS the session ends by itself;
//   - a single reply is capped at MAX_REPLY_MS of audible speech;
//   - ending (End button, Escape, idle, agent hang-up) stops every media
//     track the SDK opened and releases the microphone.
import { useCallback, useEffect, useRef, useState } from 'react'
import { ConversationProvider, useConversation } from '@elevenlabs/react'
import { lipsync } from './store'

export type VoiceMode = 'voice' | 'text'
export type VoiceStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'

export type VoiceApi = {
  /** Send typed text into the live conversation. */
  send: (text: string) => void
  /** Silence the agent's current reply (client-side; the transcript still lands). */
  interrupt: () => void
  end: () => void
}

export type VoiceSessionProps = {
  agentId: string
  /** What the visitor did first: held the mic (voice) or typed (text). */
  mode: VoiceMode
  /** True while the push-to-talk button is held. */
  holding: boolean
  /** Text to send as soon as the session is up (the panel's first message). */
  initialText?: string | null
  /** Fires once initialText has been sent, so the panel can drop it. */
  onInitialSent?: () => void
  /** A voice session fell back to text (mic denied or unavailable). */
  onTextOnly?: () => void
  onTranscript: (role: 'you' | 'ai', text: string) => void
  onSpeaking: (speaking: boolean) => void
  /** `idle` means the session ended cleanly (visitor, Escape, idle timer) — the panel resets. */
  onStatus: (status: VoiceStatus, detail?: string) => void
  onReady: (api: VoiceApi | null) => void
}

const TAG = '[sardar/voice]'
/** After the mic is released, end the session if nothing more is said or typed. */
const IDLE_END_MS = 8_000
/** Longest a single agent reply may stay audible. */
const MAX_REPLY_MS = 25_000

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
  const { agentId, mode, holding, initialText, onInitialSent, onTextOnly, onTranscript, onSpeaking, onStatus, onReady } = props
  // A voice session may still end up text-only if the mic is refused.
  const [textOnly, setTextOnly] = useState(mode === 'text')

  // Everything below reads through refs: useConversation returns a new object
  // every render, and callbacks registered with the SDK must not go stale.
  const alive = useRef(true)      // false once the panel unmounts us — no more reports upward
  const silenced = useRef(false)  // output muted by us until the agent's next reply
  const released = useRef(false)  // mic let go and nothing said or typed since
  const idleTimer = useRef<number | null>(null)
  const replyTimer = useRef<number | null>(null)
  const started = useRef(false)
  const sentInitial = useRef(false)

  const clear = (t: typeof idleTimer) => { if (t.current !== null) { window.clearTimeout(t.current); t.current = null } }

  // Push-to-talk: the mic is muted unless the button is held. The SDK keeps
  // its own VAD, so releasing simply stops audio reaching it. A text
  // conversation has no mic and throws on setMicMuted, so it gets no
  // micMuted at all.
  const conv = useConversation({
    ...(textOnly ? {} : { micMuted: !holding }),
    onMessage: ({ message, role }) => {
      if (!alive.current) return
      if (role !== 'user') unsilence() // a new reply: let it be heard
      onTranscript(role === 'user' ? 'you' : 'ai', message)
    },
    onModeChange: ({ mode: m }) => {
      if (!alive.current) return
      const speaking = m === 'speaking'
      if (speaking) armReplyCap(); else clear(replyTimer)
      onSpeaking(speaking && !silenced.current)
      // The idle clock restarts when the agent starts or stops talking, so it
      // measures silence after the reply, not time since the mic was let go.
      if (released.current) armIdleEnd()
    },
    onStatusChange: ({ status }) => {
      if (!alive.current) return
      if (status === 'connecting' || status === 'connected') onStatus(status)
      // "disconnecting" / "disconnected" are reported from onDisconnect, which
      // fires last and carries the reason.
    },
    onError: (message, context) => {
      // Surfaced so the next failure is diagnosable from the console.
      console.warn(TAG, 'error:', message, context ?? '')
      if (alive.current) onStatus('error', message)
    },
    onDisconnect: (details) => {
      clear(idleTimer); clear(replyTimer)
      releaseAudio()
      const ctx = 'context' in details && details.context ? details.context : undefined
      const message = details.reason === 'error' ? details.message : undefined
      console.warn(TAG, 'disconnected:', details.reason, message ?? '', ctx ?? '')
      if (!alive.current) return
      onSpeaking(false)
      // "user" is us ending it (End, Escape, idle): the panel goes back to
      // idle. "agent" is a hang-up, "error" the server dropping the room.
      onStatus(details.reason === 'user' ? 'idle' : details.reason === 'error' ? 'error' : 'disconnected', message)
    },
  })
  const convRef = useRef(conv)
  useEffect(() => { convRef.current = conv }) // first effect, so the ones below read the latest

  const silence = (why: string) => {
    const c = convRef.current
    if (c.status !== 'connected' || silenced.current) return
    silenced.current = true
    try { c.setVolume({ volume: 0 }) } catch (err) { console.warn(TAG, 'could not mute output:', (err as Error)?.message) }
    console.warn(TAG, 'reply silenced:', why)
    onSpeaking(false)
  }
  const unsilence = () => {
    if (!silenced.current) return
    silenced.current = false
    try { convRef.current.setVolume({ volume: 1 }) } catch { /* session already gone */ }
  }
  const end = useCallback((why: string) => {
    clear(idleTimer); clear(replyTimer)
    console.warn(TAG, 'ending session:', why)
    convRef.current.endSession()
    releaseAudio()
  }, [])
  const armReplyCap = () => {
    if (replyTimer.current !== null) return
    replyTimer.current = window.setTimeout(() => {
      replyTimer.current = null
      silence(`reply ran past ${MAX_REPLY_MS / 1000}s`)
    }, MAX_REPLY_MS)
  }
  const armIdleEnd = () => {
    clear(idleTimer)
    idleTimer.current = window.setTimeout(() => {
      idleTimer.current = null
      const c = convRef.current
      // Never cut an audible reply short; wait for it to finish, then count again.
      if (c.status === 'connected' && c.isSpeaking && !silenced.current) { armIdleEnd(); return }
      end(`no input for ${IDLE_END_MS / 1000}s after the mic was released`)
    }, IDLE_END_MS)
  }
  // The visitor is speaking or typing: the idle clock stops.
  const noteInput = () => { released.current = false; clear(idleTimer) }
  // Input is over (mic let go, line sent): the idle clock starts. Text-only
  // sessions have no mic and no clock; End and Escape cover them.
  const noteInputDone = () => { if (textOnly) return; released.current = true; armIdleEnd() }

  useEffect(() => {
    if (started.current) return
    started.current = true
    let cancelled = false
    const startText = () => {
      setTextOnly(true)
      // textOnly at the top level picks the SDK's TextConversation; the
      // websocket transport is the only one it supports.
      convRef.current.startSession({ agentId, connectionType: 'websocket', textOnly: true })
    }
    ;(async () => {
      onStatus('connecting')
      try {
        if (mode === 'text') { startText(); return }
        // WebRTC needs a microphone. Ask up front so a refusal falls back to
        // text instead of failing inside the room; the SDK opens its own
        // stream, so this one is released straight away.
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          stream.getTracks().forEach((t) => t.stop())
        } catch (err) {
          console.warn(TAG, 'microphone unavailable, falling back to text:', (err as Error)?.message)
          if (!cancelled) { onTextOnly?.(); startText() }
          return
        }
        if (!cancelled) convRef.current.startSession({ agentId, connectionType: 'webrtc' })
      } catch (err) {
        console.warn(TAG, 'could not start session:', (err as Error)?.message)
        onStatus('error', (err as Error)?.message)
      }
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push-to-talk edges. Holding is input; letting go silences the agent's
  // current speech and starts the idle clock.
  const wasHolding = useRef(holding)
  useEffect(() => {
    if (textOnly || holding === wasHolding.current) return
    wasHolding.current = holding
    if (holding) { noteInput(); return }
    if (convRef.current.status !== 'connected') return // the connected effect below arms the clock
    if (convRef.current.isSpeaking) silence('mic released')
    noteInputDone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holding, textOnly])

  // Connected with the mic already let go (a quick press while connecting):
  // start the idle clock now, or the session would sit open with no input.
  useEffect(() => {
    if (conv.status !== 'connected' || textOnly || holding) return
    noteInputDone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conv.status, textOnly])

  // Lip-sync from the SDK's own output meter while a voice session is connected.
  useEffect(() => {
    if (conv.status !== 'connected' || textOnly) return
    lipsync.attachVolume(() => (silenced.current ? 0 : convRef.current.getOutputVolume()))
    return () => lipsync.detachVolume()
  }, [conv.status, textOnly])

  // Expose send/interrupt/end to the panel, and flush the message that started the session.
  useEffect(() => {
    if (conv.status !== 'connected') { onReady(null); return }
    onReady({
      send: (t) => { noteInput(); convRef.current.sendUserMessage(t); noteInputDone() },
      interrupt: () => silence('interrupted by the visitor'),
      end: () => end('ended by the visitor'),
    })
    if (initialText && !sentInitial.current) {
      sentInitial.current = true
      convRef.current.sendUserMessage(initialText)
      onInitialSent?.()
      noteInputDone()
    }
    return () => onReady(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conv.status, textOnly, initialText, onInitialSent, onReady])

  // End the session only when the panel unmounts this component (End button,
  // a reconnect or an upgrade remounts it under a new key). Nothing is
  // reported upward after that: the panel already knows what it did.
  useEffect(() => () => {
    alive.current = false
    clear(idleTimer); clear(replyTimer)
    convRef.current.endSession()
    releaseAudio()
  }, [])

  return null
}
