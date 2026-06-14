-- Ad Growly Supabase schema.
-- Run this in the Supabase SQL Editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  business_name text not null,
  business_vertical text,
  website_url text,
  ad_budget text not null,
  contact_name text not null,
  contact_email text not null,
  phone text,
  gmb_status text not null,
  status text not null default 'pending',
  constraint submissions_status_check check (status in ('pending', 'contacted', 'qualified', 'closed')),
  constraint submissions_contact_email_check check (position('@' in contact_email) > 1)
);

alter table public.submissions enable row level security;

revoke all on table public.submissions from anon, authenticated;
grant insert on table public.submissions to anon, authenticated;
grant select, insert, update, delete on table public.submissions to service_role;

drop policy if exists "public can create submissions" on public.submissions;
create policy "public can create submissions"
on public.submissions
for insert
to anon, authenticated
with check (
  business_name <> ''
  and contact_name <> ''
  and contact_email <> ''
  and ad_budget <> ''
  and gmb_status <> ''
  and status = 'pending'
);

create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_status_idx on public.submissions (status);
