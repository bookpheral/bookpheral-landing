-- Run this in your Supabase SQL Editor to create the waitlist table.

create table public.waitlist (
  id               uuid primary key default gen_random_uuid(),
  full_name        text        not null,
  email            text        not null unique,
  institution      text        not null,
  department       text        not null,
  bio              text        not null,
  student_count    text        not null,
  published_before text        not null,
  newsletter       boolean     not null default true,
  created_at       timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- No public read/write — all inserts go through the server-side service role key.
-- Add admin read policies here if you build a dashboard later.
