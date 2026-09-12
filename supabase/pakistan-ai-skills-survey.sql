-- Pakistan AI Skills Survey 2026 — responses (Corroboration Engine, Day 8).
--
-- Responses were going to the shared Google Apps Script webhook tagged
-- type='survey_response' and could not be found afterwards. This table is
-- the record of truth; the webhook is kept only as a secondary sink.
--
-- Deliberately anonymous, exactly as /survey promises: no name, no phone.
-- Email is stored ONLY when the respondent asked to be sent the results.
create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey text not null default 'pakistan-ai-skills-2026',
  country text not null,
  age text,
  work text,
  tried text,
  blocker text not null,
  language text,
  budget text,
  tools text,
  goal text,
  built text,
  email text,                                    -- only if they asked for results
  comment text,
  created_at timestamptz not null default now()
);

alter table public.survey_responses enable row level security;
-- No anon policies: inserts go through the server (service role) only,
-- the same rule mastery_enrol_requests follows.

create index if not exists survey_responses_created_at_idx
  on public.survey_responses (created_at desc);

-- How to read it (Supabase SQL editor):
--   select count(*) from public.survey_responses;
--   select blocker, count(*) from public.survey_responses group by 1 order by 2 desc;
