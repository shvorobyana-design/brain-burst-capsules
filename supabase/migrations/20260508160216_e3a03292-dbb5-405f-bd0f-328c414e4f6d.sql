
-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  language text not null default 'ua',
  xp integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);
create policy "Profiles insert by owner"
  on public.profiles for insert
  with check (auth.uid() = id);
create policy "Profiles update by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- User progress
create table public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  read_capsules text[] not null default '{}',
  quiz_results jsonb not null default '{}'::jsonb,
  final_tests jsonb not null default '{}'::jsonb,
  stats jsonb not null default '{}'::jsonb,
  unlocked_achievements text[] not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.user_progress enable row level security;

create policy "Progress viewable by owner"
  on public.user_progress for select using (auth.uid() = user_id);
create policy "Progress insert by owner"
  on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Progress update by owner"
  on public.user_progress for update using (auth.uid() = user_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger user_progress_set_updated_at before update on public.user_progress
  for each row execute function public.set_updated_at();

-- New user trigger: create profile + empty progress
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
