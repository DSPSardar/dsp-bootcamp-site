// The three outbound links on /sardar, built from src/config/site.ts so no
// URL or phone number is hardcoded here.
import { site, mastery, agency, waLink } from '@/config/site'

/** "Build your own SARDAR" → the Mastery landing page (absolute, per brief). */
export const MASTERY_URL = `${site.url}${mastery.url}`

/** "Get this for your business" → DSP Agent Hub, tagged so the Hub can see the source. */
export const ASOS_DEMO_URL = `${agency.hubUrl}?ref=sardar`

/** Lead capture: one WhatsApp deep link to the site's business number. */
export const WHATSAPP_URL = waLink('Hi DSP, I just met SARDAR on your site. I want one for my business.')

