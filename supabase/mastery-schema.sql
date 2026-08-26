-- DSP AI Agent Mastery — student dashboard schema
-- Run once in Supabase SQL editor. Auth is Supabase magic-link; enrolment is granted by the API (service role), never self-serve.

create table if not exists public.mastery_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  status text not null default 'pending' check (status in ('pending','active','refunded','suspended')),
  source text,                       -- 'asos' | 'dodo' | 'manual' | 'beta'
  enrolled_at timestamptz,
  support_until timestamptz,         -- enrolled_at + 12 months
  created_at timestamptz not null default now()
);

create table if not exists public.mastery_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_file text not null,         -- matches course.json lesson.file
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_file)
);

create table if not exists public.mastery_capstones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  live_url text not null,
  repo_url text not null,
  video_url text,
  proposal_url text,
  notes text,
  status text not null default 'submitted' check (status in ('submitted','changes_requested','approved')),
  feedback text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.mastery_certificates (
  code text primary key,             -- e.g. DSP-AM-7K3Q9X
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  capstone_id uuid references public.mastery_capstones(id),
  issued_at timestamptz not null default now()
);

alter table public.mastery_profiles enable row level security;
alter table public.mastery_progress enable row level security;
alter table public.mastery_capstones enable row level security;
alter table public.mastery_certificates enable row level security;

create policy "own profile" on public.mastery_profiles for select using (auth.uid() = id);
create policy "own progress read" on public.mastery_progress for select using (auth.uid() = user_id);
create policy "own progress write" on public.mastery_progress for insert with check (auth.uid() = user_id);
create policy "own progress delete" on public.mastery_progress for delete using (auth.uid() = user_id);
create policy "own capstone read" on public.mastery_capstones for select using (auth.uid() = user_id);
create policy "own capstone write" on public.mastery_capstones for insert with check (auth.uid() = user_id);
create policy "own certificate" on public.mastery_certificates for select using (auth.uid() = user_id);
-- public verification page reads certificates via service role; no anon policy on purpose.

-- profile row auto-created on first login; status stays 'pending' until enrolment API activates it
create or replace function public.mastery_handle_new_user() returns trigger language plpgsql security definer as $$
begin
  insert into public.mastery_profiles (id, email) values (new.id, new.email) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists mastery_on_auth_user_created on auth.users;
create trigger mastery_on_auth_user_created after insert on auth.users for each row execute function public.mastery_handle_new_user();
