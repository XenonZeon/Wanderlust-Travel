create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  phone        text not null,
  destination  text,
  message      text,
  source       text not null default 'landing',
  ip_hash      text,
  user_agent   text,
  tg_delivered boolean not null default false
);

alter table public.leads enable row level security;
-- No policies: table is write-only via service_role (server-side).
-- anon and authenticated roles have zero access.

create index leads_ip_recent_idx on public.leads (ip_hash, created_at desc);
