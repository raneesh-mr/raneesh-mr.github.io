-- Run this in Supabase → SQL Editor → New Query

-- Lead status enum
create type lead_status as enum (
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Negotiating',
  'Won',
  'Lost',
  'On Hold'
);

-- Leads table
create table leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  interest    text,
  message     text not null,
  source      text default 'raneesh.net',
  status      lead_status default 'New',
  notes       text
);

-- Auto-update updated_at on every row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_updated_at
  before update on leads
  for each row execute function update_updated_at();

-- Indexes
create index leads_email_idx   on leads(email);
create index leads_created_idx on leads(created_at desc);
create index leads_status_idx  on leads(status);
