'use client'
// The R3F hologram stage. Loaded only on the client, only after Stage.tsx
// has confirmed WebGL, enough device memory and no reduced-motion request.
// Everything animated reads the shared stores in ./store.ts each frame, so
// the React tree never re-renders for a mouth movement or a glance.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Chart } from './demo'
import { lipsync, look } from './store'

const CYAN = '#3FE0F5'
const NAVY = '#0B1630'

export type Avatar3DProps = { avatarUrl: string | null; speaking: boolean; chart: Chart | null; active: boolean; mobile: boolean }

export default function Avatar3D({ avatarUrl, speaking, chart, active, mobile }: Avatar3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.1], fov: 32 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      aria-hidden="true"
    >
      <Lights />
      <Rig speaking={speaking}>
        {avatarUrl ? <RpmBust url={avatarUrl} /> : <ProceduralBust />}
      </Rig>
      <Particles count={mobile ? 120 : 260} />
      <Floor />
      {chart && <Chart3D chart={chart} />}
    </Canvas>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} color="#8fd8e8" />
      {/* two cyan rim lights from behind, one dim warm key from the front */}
      <pointLight position={[-2.4, 1.4, -1.2]} intensity={14} color={CYAN} distance={8} />
      <pointLight position={[2.4, 1.0, -1.4]} intensity={12} color="#19B3C4" distance={8} />
      <directionalLight position={[0.6, 1.2, 2.5]} intensity={0.9} color="#e5a488" />
    </>
  )
}

/** Breathing + head tracking for whichever bust is inside. */
function Rig({ speaking, children }: { speaking: boolean; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const portrait = viewport.width < viewport.height * 1.05
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const el = g.current
    if (!el) return
    const base = portrait ? 0.78 : 0.82
    const breathe = base * (1 + Math.sin(t * 1.5) * 0.012)
    el.scale.set(base, breathe, base)
    el.position.y = (portrait ? 0.42 : 0.08) + Math.sin(t * 1.5) * 0.01
    el.position.x = portrait ? 0 : -0.5
    // ease toward the cursor; a touch more when speaking (it "addresses" you)
    const k = speaking ? 0.4 : 0.32
    el.rotation.y += (look.x * k - el.rotation.y) * 0.08
    el.rotation.x += (look.y * 0.18 - el.rotation.x) * 0.08
  })
  return <group ref={g}>{children}</group>
}

/** Low-poly hologram bust used whenever /public/sardar/avatar.glb is absent. */
function ProceduralBust() {
  const mouth = useRef<THREE.Mesh>(null)
  const eyes = useRef<THREE.Group>(null)
  const blink = useRef({ next: 2.5, until: 0 })
  const solid = useMemo(() => new THREE.MeshStandardMaterial({ color: NAVY, emissive: '#0a2a3a', emissiveIntensity: 0.6, metalness: 0.35, roughness: 0.45, flatShading: true }), [])
  const wire = useMemo(() => new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.22 }), [])
  const glow = useMemo(() => new THREE.MeshBasicMaterial({ color: CYAN }), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const lvl = lipsync.level(t)
    if (mouth.current) { mouth.current.scale.y = 0.15 + lvl * 1.4; mouth.current.scale.x = 1 - lvl * 0.25 }
    const b = blink.current
    if (t > b.next) { b.until = t + 0.12; b.next = t + 2.5 + Math.random() * 3.5 }
    if (eyes.current) eyes.current.scale.y = t < b.until ? 0.1 : 1
  })

  return (
    <group>
      {/* head */}
      <mesh material={solid} scale={[0.5, 0.58, 0.52]}><icosahedronGeometry args={[1, 2]} /></mesh>
      <mesh material={wire} scale={[0.505, 0.585, 0.525]}><icosahedronGeometry args={[1, 2]} /></mesh>
      {/* neck + shoulders */}
      <mesh material={solid} position={[0, -0.62, 0]}><cylinderGeometry args={[0.16, 0.2, 0.32, 8]} /></mesh>
      <mesh material={solid} position={[0, -1.0, -0.05]} scale={[1.15, 0.36, 0.6]}><sphereGeometry args={[1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
      <mesh material={wire} position={[0, -1.0, -0.05]} scale={[1.16, 0.365, 0.61]}><sphereGeometry args={[1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
      {/* eyes */}
      <group ref={eyes} position={[0, 0.06, 0.5]}>
        <mesh material={glow} position={[-0.17, 0, 0]} scale={[1.5, 1, 0.5]}><sphereGeometry args={[0.05, 12, 8]} /></mesh>
        <mesh material={glow} position={[0.17, 0, 0]} scale={[1.5, 1, 0.5]}><sphereGeometry args={[0.05, 12, 8]} /></mesh>
      </group>
      {/* mouth: a bar whose Y scale is the lip-sync level */}
      <mesh ref={mouth} material={glow} position={[0, -0.24, 0.48]}><boxGeometry args={[0.2, 0.08, 0.03]} /></mesh>
    </group>
  )
}

function setMorph(m: THREE.Mesh, name: string, v: number) {
  const i = m.morphTargetDictionary?.[name]
  if (i !== undefined && m.morphTargetInfluences) m.morphTargetInfluences[i] = v
}

type RpmParts = { morphs: THREE.Mesh[]; head: THREE.Bone | null; offset: THREE.Vector3; scale: number }

/** Walk a Ready Player Me scene once: morph meshes, the Head bone, and a
 *  transform that puts the head at the origin whether the GLB is a bust or
 *  a full body. */
function inspectRpm(scene: THREE.Group): RpmParts {
  const morphs: THREE.Mesh[] = []
  const bones: THREE.Bone[] = []
  scene.traverse((o) => {
    const m = o as THREE.Mesh
    if (m.isMesh && m.morphTargetDictionary) morphs.push(m)
    if ((o as THREE.Bone).isBone && /head/i.test(o.name)) bones.push(o as THREE.Bone)
    if (m.isMesh) m.frustumCulled = false
  })
  const head = bones[0] ?? null
  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const target = new THREE.Vector3()
  if (head) head.getWorldPosition(target); else target.set(0, box.max.y - size.x * 0.4, 0)
  const scale = 0.62 / Math.max(0.1, Math.min(size.x, 0.3)) // RPM heads are ~0.2–0.25 m wide
  return { morphs, head, offset: target.negate(), scale: Math.min(scale, 4) }
}

/** Ready Player Me bust: morph-target blink + jaw, Head bone follows the cursor. */
function RpmBust({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const blink = useRef({ next: 2.5, until: 0 })
  // Framing is plain data for JSX; the mutable meshes/bones live in a ref so
  // the frame loop can drive them without touching a render-scoped value.
  const framing = useMemo(() => { const p = inspectRpm(scene); return { offset: p.offset, scale: p.scale } }, [scene])
  const partsRef = useRef<RpmParts | null>(null)
  useEffect(() => { partsRef.current = inspectRpm(scene) }, [scene])

  useFrame(({ clock }) => {
    const parts = partsRef.current
    if (!parts) return
    const t = clock.elapsedTime
    const lvl = lipsync.level(t)
    const b = blink.current
    if (t > b.next) { b.until = t + 0.12; b.next = t + 2.5 + Math.random() * 3.5 }
    const closed = t < b.until ? 1 : 0
    for (const m of parts.morphs) {
      setMorph(m, 'jawOpen', lvl * 0.6)
      setMorph(m, 'mouthOpen', lvl)
      setMorph(m, 'viseme_aa', lvl * 0.8)
      setMorph(m, 'eyeBlinkLeft', closed)
      setMorph(m, 'eyeBlinkRight', closed)
    }
    if (parts.head) {
      const h = parts.head
      h.rotation.y += (look.x * 0.35 - h.rotation.y) * 0.1
      h.rotation.x += (look.y * 0.2 - h.rotation.x) * 0.1
    }
  })

  return (
    <group scale={framing.scale}>
      <primitive object={scene} position={framing.offset} />
    </group>
  )
}

function seedParticles(count: number) {
  const positions = new Float32Array(count * 3), speeds = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4.5
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2 - 0.5
    speeds[i] = 0.05 + Math.random() * 0.12
  }
  return { positions, speeds }
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const [{ positions, speeds }] = useState(() => seedParticles(count))
  useFrame((_, dt) => {
    const p = ref.current?.geometry.attributes.position as THREE.BufferAttribute | undefined
    if (!p) return
    const a = p.array as Float32Array
    for (let i = 0; i < count; i++) {
      a[i * 3 + 1] += speeds[i] * dt
      if (a[i * 3 + 1] > 1.6) a[i * 3 + 1] = -1.6
    }
    p.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.022} color={CYAN} transparent opacity={0.65} depthWrite={false} sizeAttenuation />
    </points>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
      <ringGeometry args={[0.55, 1.15, 48]} />
      <meshBasicMaterial color={CYAN} transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

/** Floating bars / ring next to the bust; scales in from zero when the chart changes. */
function Chart3D({ chart }: { chart: Chart }) {
  const g = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const portrait = viewport.width < viewport.height * 1.05
  const anim = useRef<{ chart: Chart | null; t0: number }>({ chart: null, t0: 0 })
  const max = Math.max(1, ...chart.items.map((i) => i.value))
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: CYAN, emissive: CYAN, emissiveIntensity: 0.5, transparent: true, opacity: 0.85 }), [])
  const dim = useMemo(() => new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.14 }), [])
  useFrame(({ clock }) => {
    const el = g.current
    if (!el) return
    if (anim.current.chart !== chart) anim.current = { chart, t0: performance.now() }
    const p = Math.min(1, (performance.now() - anim.current.t0) / 900)
    const e = 1 - Math.pow(1 - p, 3)
    el.scale.setScalar(e * (portrait ? 0.5 : 0.62))
    el.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.25
    el.position.set(portrait ? 0 : 0.85, portrait ? -0.72 : -0.25, portrait ? 0.9 : 0.2)
  })
  return (
    <group ref={g}>
      {chart.type === 'bars'
        ? chart.items.map((it, i) => {
            const h = 0.1 + (it.value / max) * 0.9, n = chart.items.length, x = (i - (n - 1) / 2) * 0.28
            return (
              <group key={it.label}>
                <mesh material={dim} position={[x, 0.5, 0]}><boxGeometry args={[0.18, 1.0, 0.18]} /></mesh>
                <mesh material={mat} position={[x, h / 2, 0]}><boxGeometry args={[0.18, h, 0.18]} /></mesh>
              </group>
            )
          })
        : chart.items.map((it, i) => {
            const n = chart.items.length, seg = (Math.PI * 2) / n, gap = 0.12, start = i * seg + gap / 2
            const on = (it.value / max) * (seg - gap)
            return (
              <group key={it.label}>
                <mesh material={dim} rotation={[0, 0, start]}><torusGeometry args={[0.55, 0.06, 8, 24, seg - gap]} /></mesh>
                {on > 0.01 && <mesh material={mat} rotation={[0, 0, start]}><torusGeometry args={[0.55, 0.065, 8, 24, on]} /></mesh>}
              </group>
            )
          })}
    </group>
  )
}
