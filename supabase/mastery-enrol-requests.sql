-- PKR enrolment requests (bank/JazzCash/Easypaisa) awaiting admin approval
create table if not exists public.mastery_enrol_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  country text,
  method text not null default 'pkr',            -- pkr | other
  amount_note text,                              -- what they say they paid
  proof_path text,                               -- storage path of the screenshot
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
alter table public.mastery_enrol_requests enable row level security;
-- no anon policies: inserts go through the server (service role) only

-- private bucket for payment screenshots
insert into storage.buckets (id, name, public) values ('mastery-proofs','mastery-proofs', false)
on conflict (id) do nothing;

-- who may open the admin page
create table if not exists public.mastery_admins (email text primary key);
insert into public.mastery_admins (email) values ('rabco007@gmail.com'), ('info@digitalservicesprogram.com')
on conflict (email) do nothing;
alter table public.mastery_admins enable row level security;
create policy "self read" on public.mastery_admins for select using (auth.jwt() ->> 'email' = email);
