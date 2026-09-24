# SARDAR knowledge base

Five plain-text files for the public SARDAR voice agent's ElevenLabs knowledge base. Upload each file as a document on the agent; each stays under 15,000 characters.

| File | What it holds | Built from |
|---|---|---|
| mastery-course.md | Every module M01–M16: outcome, lesson titles in order, what the student builds; welcome videos, always-open modules, capstone and certificate rules | src/content/mastery/course.json, /mastery/curriculum |
| mastery-offer.md | Price, what's included, who it's for, how to enrol, every /mastery FAQ verbatim, support contacts | src/config/site.ts, /mastery, faqs.ts, /mastery/enrol |
| asos-product.md | What ASOS / DSP Agent Hub is, the AI Employees, published pricing, DSP's own proof points with sources and dates, how to get a demo | src/config/site.ts `agency`, /ai-employees, /pricing, the ASOS repo README |
| about-dsp.md | The company, office, contacts, Sardar Ghaffar's bio and verified credentials, Sundus Khan, channels | src/config/site.ts, /about, /sardar-ghaffar |
| sardar-persona.md | Tone rules and 15 example answers in English, Urdu and Roman Urdu | the /sardar brief |

Rules, the same ones CLAUDE.md sets for the site: every figure traces to a named dashboard with a date and is quoted with both; no estimates; no bank or wallet numbers (the enrol page has them); the only published contact number is +92 342 0580864. When a fact changes in src/config/site.ts or course.json, update the matching file here and re-upload it to the agent.
