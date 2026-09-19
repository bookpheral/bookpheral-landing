/*
  SQL to create the waitlist table — run this in your Supabase SQL editor:

  create table public.waitlist (
    id          uuid primary key default gen_random_uuid(),
    full_name   text not null,
    email       text not null unique,
    institution text not null,
    department  text not null,
    bio         text not null,
    student_count    text not null,
    published_before text not null,
    newsletter  boolean not null default true,
    created_at  timestamptz not null default now()
  );

  alter table public.waitlist enable row level security;

  -- No public read/write — all inserts go through the server-side service role.
  -- If you ever want to expose a read policy for an admin dashboard, add it here.
*/

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var");
  }

  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}
