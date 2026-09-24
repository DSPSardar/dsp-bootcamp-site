// Typed access to the Demo Mode script for /sardar. The JSON is the single
// place the canned answers live; this file only gives it a shape.
import raw from '@/content/sardar/demo.json'

export type ChartKind = 'bars' | 'ring'
export type ChartItem = { label: string; value: number }
export type Chart = { type: ChartKind; title: string; unit: string; items: ChartItem[] }
export type CtaKind = 'mastery' | 'asos'
export type Chip = {
  id: string
  label: string
  answer: string
  chart: Chart
  cta: { kind: CtaKind; label: string }
  modules: string[]
}
export type ModuleCard = { code: string; title: string; chip: string; saw: string }

export const DEMO_CHIPS: ReadonlyArray<Chip> = raw.chips as Chip[]
export const DEMO_MODULES: ReadonlyArray<ModuleCard> = raw.modules as ModuleCard[]

/** Printed next to every demo chart and on the stage badge. */
export const DEMO_BADGE = 'Demo data · illustrative'
