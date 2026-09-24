// Tiny mutable stores shared between the React UI and the R3F scene. They
// are refs, not state: the scene reads them every frame, and nothing should
// re-render when they change.

/** Where SARDAR looks: -1..1 on each axis, 0 0 = at the camera. */
export const look = { x: 0, y: 0 }

/** Lip-sync source. `level()` returns 0..1 mouth openness for this frame.
 *  - With an AnalyserNode attached (step 4: the ElevenLabs output stream),
 *    it is a smoothed RMS of the audio.
 *  - Without one, `synthetic` (set while a canned answer is typing out)
 *    drives a speech-like noise so the mouth still moves in Demo Mode. */
class LipSync {
  private ctx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private buf: Uint8Array<ArrayBuffer> | null = null
  private srcNode: AudioNode | null = null
  private smooth = 0
  private volume: (() => number) | null = null
  synthetic = false

  /** Step 4: the ElevenLabs SDK exposes its own output analyser as a 0..1
   *  volume getter; that beats tapping its WebRTC stream a second time. */
  attachVolume(getter: () => number) { this.volume = getter }
  detachVolume() { this.volume = null }

  private ensure() {
    if (this.ctx) return this.ctx
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AC()
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 512
    this.analyser.smoothingTimeConstant = 0.5
    this.buf = new Uint8Array(this.analyser.fftSize) as Uint8Array<ArrayBuffer>
    return this.ctx
  }

  attachStream(stream: MediaStream) {
    this.detach()
    const ctx = this.ensure()
    this.srcNode = ctx.createMediaStreamSource(stream)
    this.srcNode.connect(this.analyser!)
    void ctx.resume()
  }

  attachElement(el: HTMLMediaElement) {
    this.detach()
    const ctx = this.ensure()
    const node = ctx.createMediaElementSource(el)
    node.connect(this.analyser!)
    node.connect(ctx.destination) // keep it audible
    this.srcNode = node
    void ctx.resume()
  }

  detach() {
    try { this.srcNode?.disconnect() } catch { /* already gone */ }
    this.srcNode = null
  }

  get attached() { return this.srcNode !== null || this.volume !== null }

  /** Call once per frame. `t` is seconds, used only by the synthetic path. */
  level(t: number): number {
    let target = 0
    if (this.volume) {
      target = Math.min(1, this.volume() * 1.8)
    } else if (this.srcNode && this.analyser && this.buf) {
      this.analyser.getByteTimeDomainData(this.buf)
      let sum = 0
      for (let i = 0; i < this.buf.length; i++) { const v = (this.buf[i] - 128) / 128; sum += v * v }
      const rms = Math.sqrt(sum / this.buf.length)
      target = Math.min(1, rms * 6) // speech RMS sits around 0.05–0.2
    } else if (this.synthetic) {
      // Three overlapping sines ≈ syllable rhythm at ~4 Hz with pauses.
      const s = Math.sin(t * 8.1) * 0.5 + Math.sin(t * 13.7) * 0.3 + Math.sin(t * 2.3) * 0.2
      const gate = Math.sin(t * 1.1) > -0.6 ? 1 : 0
      target = Math.max(0, s) * gate
    }
    // Fast attack, slower release, so consonants pop and the mouth doesn't flutter shut.
    this.smooth += (target - this.smooth) * (target > this.smooth ? 0.5 : 0.18)
    return this.smooth
  }
}

export const lipsync = new LipSync()
