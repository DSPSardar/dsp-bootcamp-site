-- What each student actually watched: opens + seconds of video played.
-- Written by the server only (service role); students never write here directly.
create table if not exists public.mastery_views (
  user_id     uuid not null references auth.users(id) on delete cascade,
  lesson_file text not null,
  opens       int  not null default 0,
  seconds     int  not null default 0,          -- furthest playback position reached
  duration    int,                              -- lesson length, for % watched
  first_at    timestamptz not null default now(),
  last_at     timestamptz not null default now(),
  primary key (user_id, lesson_file)
);
alter table public.mastery_views enable row level security;
create policy "own views" on public.mastery_views for select using (auth.uid() = user_id);
create index if not exists mastery_views_last_at_idx on public.mastery_views (last_at desc);
