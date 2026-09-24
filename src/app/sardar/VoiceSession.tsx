'use client'
// The ElevenLabs Conversational AI session. This file is the only importer
// of @elevenlabs/react (which carries LiveKit), and VoicePanel loads it
// dynamically on the visitor's first tap, so the SDK never rides the initial
// bundle. It owns one session for the life of the panel and reports
// everything upward through callbacks; SardarClient keeps the transcript.
import { useEffect, useRef } from 'react'
import { ConversationProvider, useConversation } from '@elevenlabs/react'
import { lipsync } from './store'

export type VoiceApi = {
  /** Send typed text into the live conversation. */
  send: (text: string) => void
  end: () => void
}

export type VoiceSessionProps = {
  agentId: string
  /** True while the push-to-talk button is held. */
  holding: boolean
  /** Text to send as soon as the session is up (the panel's first message). */
  initialText?: string | null
  onTranscript: (role: 'you' | 'ai', text: string) => void
  onSpeaking: (speaking: boolean) => void
  onStatus: (status: 'connecting' | 'connected' | 'disconnected' | 'error', detail?: string) => void
  onReady: (api: VoiceApi | null) => void
}

export default function VoiceSession(props: VoiceSessionProps) {
  return (
    <ConversationProvider
      onMessage={({ message, role }) => props.onTranscript(role === 'user' ? 'you' : 'ai', message)}
      onModeChange={({ mode }) => props.onSpeaking(mode === 'speaking')}
      onStatusChange={({ status }) => props.onStatus(status === 'disconnecting' ? 'disconnected' : status)}
      onError={(message) => props.onStatus('error', message)}
      onDisconnect={() => { props.onSpeaking(false); props.onStatus('disconnected') }}
    >
      <Session {...props} />
    </ConversationProvider>
  )
}

function Session({ agentId, holding, initialText, onReady, onStatus }: VoiceSessionProps) {
  // Push-to-talk: the mic is muted unless the button is held. The SDK keeps
  // its own VAD, so releasing simply stops audio reaching it.
  const conv = useConversation({ micMuted: !holding })
  const started = useRef(false)
  const sentInitial = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    let cancelled = false
    ;(async () => {
      onStatus('connecting')
      try {
        // WebRTC needs a microphone. If the visitor declines, fall back to a
        // text-only session so the typed input still works.
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true })
          if (!cancelled) conv.startSession({ agentId, connectionType: 'webrtc' })
        } catch {
          if (!cancelled) conv.startSession({ agentId, connectionType: 'websocket', overrides: { conversation: { textOnly: true } } })
        }
      } catch (err) {
        onStatus('error', (err as Error)?.message)
      }
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lip-sync from the SDK's own output meter while connected.
  useEffect(() => {
    if (conv.status !== 'connected') return
    lipsync.attachVolume(() => conv.getOutputVolume())
    return () => lipsync.detachVolume()
  }, [conv.status, conv])

  // Expose send/end to the panel, and flush the message that started the session.
  useEffect(() => {
    if (conv.status !== 'connected') { onReady(null); return }
    onReady({ send: (t) => conv.sendUserMessage(t), end: () => conv.endSession() })
    if (initialText && !sentInitial.current) { sentInitial.current = true; conv.sendUserMessage(initialText) }
    return () => onReady(null)
  }, [conv.status, conv, initialText, onReady])

  useEffect(() => () => { conv.endSession() }, [conv])

  return null
}
