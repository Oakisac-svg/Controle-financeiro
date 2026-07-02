begin;

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (btrim(title) <> ''),
  description text,
  frequency text not null default 'daily',
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (btrim(title) <> ''),
  description text,
  status text not null default 'pending' check (status in ('pending','in_progress','completed','cancelled')),
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  due_date timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.routine_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  habit_id uuid not null references public.habits(id) on delete cascade,
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (btrim(name) <> ''),
  calories numeric(8,2) not null default 0 check (calories >= 0),
  proteins numeric(8,2) not null default 0 check (proteins >= 0),
  carbs numeric(8,2) not null default 0 check (carbs >= 0),
  fats numeric(8,2) not null default 0 check (fats >= 0),
  meal_time timestamptz not null default now(),
  image_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.life_score (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  financial_score integer not null check (financial_score between 0 and 100),
  routine_score integer not null check (routine_score between 0 and 100),
  nutrition_score integer not null check (nutrition_score between 0 and 100),
  created_at timestamptz not null default now()
);

create index if not exists habits_user_created_idx on public.habits(user_id, created_at desc);
create index if not exists tasks_user_due_idx on public.tasks(user_id, due_date);
create index if not exists routine_logs_user_completed_idx on public.routine_logs(user_id, completed_at desc);
create index if not exists routine_logs_habit_idx on public.routine_logs(habit_id, completed_at desc);
create index if not exists meals_user_time_idx on public.meals(user_id, meal_time desc);
create index if not exists life_score_user_created_idx on public.life_score(user_id, created_at desc);

alter table public.habits enable row level security;
alter table public.tasks enable row level security;
alter table public.routine_logs enable row level security;
alter table public.meals enable row level security;
alter table public.life_score enable row level security;

do $$
declare table_name text; policy_record record;
begin
  foreach table_name in array array['habits','tasks','routine_logs','meals','life_score'] loop
    for policy_record in select policyname from pg_policies where schemaname='public' and tablename=table_name loop
      execute format('drop policy if exists %I on public.%I', policy_record.policyname, table_name);
    end loop;
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', table_name || '_select_own', table_name);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', table_name || '_insert_own', table_name);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name || '_update_own', table_name);
    execute format('create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', table_name || '_delete_own', table_name);
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end $$;

-- Impede que um log associe um hábito pertencente a outro usuário.
create or replace function public.validate_routine_log_owner()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (select 1 from public.habits where id = new.habit_id and user_id = new.user_id) then
    raise exception 'habit_id does not belong to user_id';
  end if;
  return new;
end;
$$;
drop trigger if exists routine_log_owner_guard on public.routine_logs;
create trigger routine_log_owner_guard before insert or update on public.routine_logs
for each row execute function public.validate_routine_log_owner();

revoke all on function public.validate_routine_log_owner() from public, anon, authenticated;
commit;
