-- Joan Andrews Denture Clinic consultation request storage.
-- Run this in Supabase SQL Editor after the project is active.
create table if not exists public.consultation_requests (
  id bigint generated always as identity primary key,
  full_name text not null check (char_length(full_name) between 1 and 120),
  phone text not null check (char_length(phone) between 1 and 40),
  email text,
  service text not null default 'Consultation',
  preferred_date date,
  preferred_time text,
  preferred_time_window text,
  notes text,
  source text not null default 'joan-andrews-clinic-website',
  created_at timestamptz not null default now()
);

alter table public.consultation_requests enable row level security;

-- Do not allow website visitors to read or write directly to this table.
revoke all on table public.consultation_requests from anon, authenticated;
grant insert on table public.consultation_requests to service_role;
