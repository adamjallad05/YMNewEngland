create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  full_name text,
  role text check (role in ('admin', 'editor') or role is null),
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = excluded.full_name;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  start_datetime timestamptz not null,
  end_datetime timestamptz not null,
  region text not null,
  secondary_regions text[] default '{}',
  venue_name text,
  address text,
  speaker_names text[] default '{}',
  category text,
  gender_audience text,
  age_group text,
  registration_url text,
  flyer_image_url text,
  contact_name text,
  contact_email text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint valid_datetime_range check (end_datetime > start_datetime)
);

create index if not exists events_start_datetime_idx on public.events (start_datetime);
create index if not exists events_status_idx on public.events (status);
create index if not exists events_region_idx on public.events (region);
create index if not exists events_secondary_regions_idx on public.events using gin (secondary_regions);
create index if not exists events_speaker_names_idx on public.events using gin (speaker_names);
create index if not exists events_tags_idx on public.events using gin (tags);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.events enable row level security;

drop policy if exists "Profiles owner read" on public.profiles;
create policy "Profiles owner read"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.current_user_role() = 'admin');

drop policy if exists "Profiles owner update" on public.profiles;
create policy "Profiles owner update"
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.current_user_role() = 'admin')
with check (id = auth.uid() or public.current_user_role() = 'admin');

drop policy if exists "Published events are public" on public.events;
create policy "Published events are public"
on public.events
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Staff can read all events" on public.events;
create policy "Staff can read all events"
on public.events
for select
to authenticated
using (public.current_user_role() in ('admin', 'editor'));

drop policy if exists "Staff can create events" on public.events;
create policy "Staff can create events"
on public.events
for insert
to authenticated
with check (
  public.current_user_role() in ('admin', 'editor')
  and (public.current_user_role() = 'admin' or created_by = auth.uid())
);

drop policy if exists "Staff can update allowed events" on public.events;
create policy "Staff can update allowed events"
on public.events
for update
to authenticated
using (
  public.current_user_role() = 'admin'
  or (public.current_user_role() = 'editor' and created_by = auth.uid())
)
with check (
  public.current_user_role() = 'admin'
  or (public.current_user_role() = 'editor' and created_by = auth.uid())
);

drop policy if exists "Delete permissions by role" on public.events;
create policy "Delete permissions by role"
on public.events
for delete
to authenticated
using (
  public.current_user_role() = 'admin'
  or (public.current_user_role() = 'editor' and created_by = auth.uid() and status = 'draft')
);

insert into storage.buckets (id, name, public)
values ('event-flyers', 'event-flyers', true)
on conflict (id) do nothing;

drop policy if exists "Event flyers public read" on storage.objects;
create policy "Event flyers public read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'event-flyers');

drop policy if exists "Staff upload flyers" on storage.objects;
create policy "Staff upload flyers"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'event-flyers'
  and public.current_user_role() in ('admin', 'editor')
);

drop policy if exists "Staff update flyers" on storage.objects;
create policy "Staff update flyers"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'event-flyers'
  and (owner = auth.uid() or public.current_user_role() = 'admin')
)
with check (
  bucket_id = 'event-flyers'
  and (owner = auth.uid() or public.current_user_role() = 'admin')
);

drop policy if exists "Staff delete flyers" on storage.objects;
create policy "Staff delete flyers"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'event-flyers'
  and (owner = auth.uid() or public.current_user_role() = 'admin')
);
