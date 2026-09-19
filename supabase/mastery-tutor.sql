-- Ustad — the 24/7 AI tutor inside /app.
-- Students study whenever they get free time; this is what is awake at 1am.
-- Threads + messages are kept so a student can come back to a conversation,
-- and so /app/admin/tutor can show which lessons confuse people.

create table if not exists public.mastery_tutor_threads (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text,                       -- first question, trimmed
  module_id   text,                       -- where the thread started
  lesson_file text,
  created_at  timestamptz not null default now(),
  last_at     timestamptz not null default now()
);
create index if not exists mastery_tutor_threads_user on public.mastery_tutor_threads (user_id, last_at desc);

create table if not exists public.mastery_tutor_messages (
  id            bigserial primary key,
  thread_id     uuid not null references public.mastery_tutor_threads(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  role          text not null check (role in ('user','assistant')),
  content       text not null,
  module_id     text,
  lesson_file   text,
  sources       jsonb,                    -- which lessons / vault docs the answer leaned on
  model         text,
  input_tokens  int,
  output_tokens int,
  answered      boolean,                  -- false when Ustad had to hand off to the Saturday session
  helpful       boolean,                  -- student thumbs up/down
  created_at    timestamptz not null default now()
);
create index if not exists mastery_tutor_messages_thread on public.mastery_tutor_messages (thread_id, id);
create index if not exists mastery_tutor_messages_recent on public.mastery_tutor_messages (created_at desc);

-- One row per student per day. The cap lives here, not in the client.
create table if not exists public.mastery_tutor_usage (
  user_id       uuid not null references auth.users(id) on delete cascade,
  day           date not null,
  messages      int not null default 0,
  input_tokens  bigint not null default 0,
  output_tokens bigint not null default 0,
  primary key (user_id, day)
);

alter table public.mastery_tutor_threads  enable row level security;
alter table public.mastery_tutor_messages enable row level security;
alter table public.mastery_tutor_usage    enable row level security;

-- Students read their own conversations; all writes go through the service role in the API.
create policy "own tutor threads"  on public.mastery_tutor_threads  for select using (auth.uid() = user_id);
create policy "own tutor messages" on public.mastery_tutor_messages for select using (auth.uid() = user_id);
create policy "own tutor usage"    on public.mastery_tutor_usage    for select using (auth.uid() = user_id);

-- Atomic count-and-cap: returns the number of messages used today AFTER this one.
-- Called before the model runs, so a student can never spend past the cap by racing tabs.
create or replace function public.mastery_tutor_take(p_user uuid, p_day date, p_cap int)
returns int language plpgsql security definer as $$
declare used int;
begin
  insert into public.mastery_tutor_usage (user_id, day, messages)
  values (p_user, p_day, 1)
  on conflict (user_id, day) do update
    set messages = public.mastery_tutor_usage.messages + 1
    where public.mastery_tutor_usage.messages < p_cap
  returning messages into used;
  return coalesce(used, -1);   -- -1 means the cap was already reached
end $$;

-- Token spend is recorded after the answer, so it never blocks the reply.
create or replace function public.mastery_tutor_spend(p_user uuid, p_day date, p_in bigint, p_out bigint)
returns void language sql security definer as $$
  update public.mastery_tutor_usage
     set input_tokens = input_tokens + p_in, output_tokens = output_tokens + p_out
   where user_id = p_user and day = p_day;
$$;
