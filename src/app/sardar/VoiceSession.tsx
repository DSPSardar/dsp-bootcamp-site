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
import { useEffect, useRef, useState } from 'react'
import { ConversationProvider, useConversation } from '@elevenlabs/react'
import { lipsync } from './store'

export type VoiceMode = 'voice' | 'text'

export type VoiceApi = {
  /** Send typed text into the live conversation. */
  send: (text: string) => void
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
  onStatus: (status: 'connecting' | 'connected' | 'disconnected' | 'error', detail?: string) => void
  onReady: (api: VoiceApi | null) => void
}

const TAG = '[sardar/voice]'

export default function VoiceSession(props: VoiceSessionProps) {
  return (
    <ConversationProvider
      onMessage={({ message, role }) => props.onTranscript(role === 'user' ? 'you' : 'ai', message)}
      onModeChange={({ mode }) => props.onSpeaking(mode === 'speaking')}
      onStatusChange={({ status }) => props.onStatus(status === 'disconnecting' ? 'disconnected' : status)}
      onError={(message, context) => {
        // Surfaced so the next failure is diagnosable from the console.
        console.warn(TAG, 'error:', message, context ?? '')
        props.onStatus('error', message)
      }}
      onDisconnect={(details) => {
        // The SDK fires this last (after status "disconnected"), so the
        // reason it carries is the one the panel keeps. "agent" is a normal
        // hang-up; "error" is the server closing the room on us.
        const ctx = 'context' in details && details.context ? details.context : undefined
        const message = details.reason === 'error' ? details.message : undefined
        console.warn(TAG, 'disconnected:', details.reason, message ?? '', ctx ?? '')
        props.onSpeaking(false)
        props.onStatus(details.reason === 'error' ? 'error' : 'disconnected', message)
      }}
    >
      <Session {...props} />
    </ConversationProvider>
  )
}

function Session({ agentId, mode, holding, initialText, onInitialSent, onTextOnly, onReady, onStatus }: VoiceSessionProps) {
  // A voice session may still end up text-only if the mic is refused.
  const [textOnly, setTextOnly] = useState(mode === 'text')
  // Push-to-talk: the mic is muted unless the button is held. The SDK keeps
  // its own VAD, so releasing simply stops audio reaching it. A text
  // conversation has no mic and throws on setMicMuted, so it gets no
  // micMuted at all.
  const conv = useConversation(textOnly ? {} : { micMuted: !holding })
  // useConversation returns a new object every render. Effects that depend on
  // it would re-run (and their cleanups fire) on every re-render — including
  // the one caused by the status flipping to "connected", which is how the
  // old unmount cleanup ended every session about a second after it opened.
  const convRef = useRef(conv)
  useEffect(() => { convRef.current = conv }) // first effect, so the ones below read the latest
  const started = useRef(false)
  const sentInitial = useRef(false)

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

  // Lip-sync from the SDK's own output meter while a voice session is connected.
  useEffect(() => {
    if (conv.status !== 'connected' || textOnly) return
    lipsync.attachVolume(() => convRef.current.getOutputVolume())
    return () => lipsync.detachVolume()
  }, [conv.status, textOnly])

  // Expose send/end to the panel, and flush the message that started the session.
  useEffect(() => {
    if (conv.status !== 'connected') { onReady(null); return }
    onReady({ send: (t) => convRef.current.sendUserMessage(t), end: () => convRef.current.endSession() })
    if (initialText && !sentInitial.current) {
      sentInitial.current = true
      convRef.current.sendUserMessage(initialText)
      onInitialSent?.()
    }
    return () => onReady(null)
  }, [conv.status, initialText, onInitialSent, onReady])

  // End the session only when the panel unmounts this component (a
  // reconnect remounts it under a new key).
  useEffect(() => () => { convRef.current.endSession() }, [])

  return null
}
