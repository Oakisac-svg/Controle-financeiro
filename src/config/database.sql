-- FinMb - schema completo para Supabase
-- Execute este arquivo inteiro no SQL Editor do Supabase.
-- Pode ser executado em um projeto novo ou sobre o schema anterior do FinMb.

begin;

-- -----------------------------------------------------------------------------
-- Tabelas
-- -----------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  monthly_income numeric(12, 2) not null default 0,
  has_debts boolean not null default false,
  has_emergency_fund boolean not null default false,
  main_goal text,
  target_savings numeric(12, 2) not null default 0,
  financial_score integer not null default 0,
  level text not null default 'bronze',
  avatar_url text,
  theme text not null default 'system',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_monthly_income_nonnegative check (monthly_income >= 0),
  constraint profiles_target_savings_nonnegative check (target_savings >= 0),
  constraint profiles_financial_score_range check (financial_score between 0 and 100),
  constraint profiles_level_allowed check (level in ('bronze', 'silver', 'gold', 'diamond')),
  constraint profiles_theme_allowed check (theme in ('light', 'dark', 'system'))
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  value numeric(12, 2) not null,
  category text not null,
  type text not null,
  date date not null,
  observation text,
  is_recurring boolean not null default false,
  recurring_frequency text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint transactions_name_not_blank check (btrim(name) <> ''),
  constraint transactions_value_positive check (value > 0),
  constraint transactions_category_allowed check (
    category in (
      'food', 'transport', 'housing', 'health', 'entertainment',
      'education', 'shopping', 'subscriptions', 'investments', 'other'
    )
  ),
  constraint transactions_type_allowed check (type in ('income', 'expense')),
  constraint transactions_frequency_allowed check (
    recurring_frequency is null
    or recurring_frequency in ('daily', 'weekly', 'monthly', 'yearly')
  ),
  constraint transactions_recurring_consistency check (
    is_recurring or recurring_frequency is null
  )
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  target_value numeric(12, 2) not null,
  current_value numeric(12, 2) not null default 0,
  deadline date not null,
  category text,
  priority text not null default 'medium',
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint goals_name_not_blank check (btrim(name) <> ''),
  constraint goals_target_value_positive check (target_value > 0),
  constraint goals_current_value_nonnegative check (current_value >= 0),
  constraint goals_priority_allowed check (priority in ('low', 'medium', 'high')),
  constraint goals_status_allowed check (status in ('active', 'completed', 'abandoned'))
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_key text not null,
  name text not null,
  description text,
  icon text,
  unlocked_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint achievements_user_key_unique unique (user_id, achievement_key),
  constraint achievements_key_not_blank check (btrim(achievement_key) <> ''),
  constraint achievements_name_not_blank check (btrim(name) <> '')
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  message text not null,
  is_read boolean not null default false,
  related_id uuid,
  created_at timestamptz not null default now(),
  constraint notifications_type_allowed check (
    type in (
      'goal_approaching', 'bill_due', 'goal_completed', 'spending_high',
      'new_record', 'achievement_unlocked'
    )
  ),
  constraint notifications_title_not_blank check (btrim(title) <> ''),
  constraint notifications_message_not_blank check (btrim(message) <> '')
);

create table if not exists public.financial_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  score integer not null default 0,
  spending_control integer not null default 0,
  savings_rate integer not null default 0,
  goal_progress integer not null default 0,
  consistency integer not null default 0,
  organization integer not null default 0,
  calculated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint financial_scores_score_range check (score between 0 and 100),
  constraint financial_scores_spending_control_range check (spending_control between 0 and 100),
  constraint financial_scores_savings_rate_range check (savings_rate between 0 and 100),
  constraint financial_scores_goal_progress_range check (goal_progress between 0 and 100),
  constraint financial_scores_consistency_range check (consistency between 0 and 100),
  constraint financial_scores_organization_range check (organization between 0 and 100)
);

create table if not exists public.finbot_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint finbot_history_messages_array check (jsonb_typeof(messages) = 'array')
);

-- Ajustes necessários ao executar sobre versões anteriores do schema.
alter table public.goals drop constraint if exists valid_deadline;
alter table public.financial_scores add column if not exists updated_at timestamptz not null default now();

-- -----------------------------------------------------------------------------
-- Índices alinhados às consultas do frontend e às tabelas auxiliares
-- -----------------------------------------------------------------------------

create index if not exists idx_transactions_user_date
  on public.transactions (user_id, date desc);
create index if not exists idx_transactions_user_category_date
  on public.transactions (user_id, category, date desc);
create index if not exists idx_transactions_user_type_date
  on public.transactions (user_id, type, date desc);

create index if not exists idx_goals_user_deadline
  on public.goals (user_id, deadline asc);
create index if not exists idx_goals_user_status_deadline
  on public.goals (user_id, status, deadline asc);

create index if not exists idx_achievements_user_unlocked
  on public.achievements (user_id, unlocked_at desc);
create index if not exists idx_notifications_user_read_created
  on public.notifications (user_id, is_read, created_at desc);
create index if not exists idx_finbot_history_user_updated
  on public.finbot_history (user_id, updated_at desc);

-- -----------------------------------------------------------------------------
-- Funções e triggers
-- -----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (user_id) do nothing;

  insert into public.financial_scores (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists update_transactions_updated_at on public.transactions;
create trigger update_transactions_updated_at
before update on public.transactions
for each row execute function public.set_updated_at();

drop trigger if exists update_goals_updated_at on public.goals;
create trigger update_goals_updated_at
before update on public.goals
for each row execute function public.set_updated_at();

drop trigger if exists update_financial_scores_updated_at on public.financial_scores;
create trigger update_financial_scores_updated_at
before update on public.financial_scores
for each row execute function public.set_updated_at();

drop trigger if exists update_finbot_history_updated_at on public.finbot_history;
create trigger update_finbot_history_updated_at
before update on public.finbot_history
for each row execute function public.set_updated_at();

-- Remove a função equivalente usada pelo schema legado, após desligar seus triggers.
drop function if exists public.update_updated_at_column();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Garante perfil e score para usuários criados antes da instalação do trigger.
insert into public.profiles (user_id, full_name)
select
  users.id,
  coalesce(users.raw_user_meta_data ->> 'full_name', '')
from auth.users as users
on conflict (user_id) do nothing;

insert into public.financial_scores (user_id)
select users.id
from auth.users as users
on conflict (user_id) do nothing;

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.goals enable row level security;
alter table public.achievements enable row level security;
alter table public.notifications enable row level security;
alter table public.financial_scores enable row level security;
alter table public.finbot_history enable row level security;

-- Remove políticas antigas e deixa este arquivo como a única fonte de verdade.
do $$
declare
  policy_record record;
begin
  for policy_record in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'profiles', 'transactions', 'goals', 'achievements',
        'notifications', 'financial_scores', 'finbot_history'
      )
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      policy_record.policyname,
      policy_record.schemaname,
      policy_record.tablename
    );
  end loop;
end;
$$;

create policy profiles_select_own
on public.profiles for select to authenticated
using ((select auth.uid()) = user_id);

create policy profiles_insert_own
on public.profiles for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy profiles_update_own
on public.profiles for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy transactions_select_own
on public.transactions for select to authenticated
using ((select auth.uid()) = user_id);

create policy transactions_insert_own
on public.transactions for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy transactions_update_own
on public.transactions for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy transactions_delete_own
on public.transactions for delete to authenticated
using ((select auth.uid()) = user_id);

create policy goals_select_own
on public.goals for select to authenticated
using ((select auth.uid()) = user_id);

create policy goals_insert_own
on public.goals for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy goals_update_own
on public.goals for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy goals_delete_own
on public.goals for delete to authenticated
using ((select auth.uid()) = user_id);

create policy achievements_select_own
on public.achievements for select to authenticated
using ((select auth.uid()) = user_id);

create policy achievements_insert_own
on public.achievements for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy notifications_select_own
on public.notifications for select to authenticated
using ((select auth.uid()) = user_id);

create policy notifications_update_own
on public.notifications for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy financial_scores_select_own
on public.financial_scores for select to authenticated
using ((select auth.uid()) = user_id);

create policy financial_scores_update_own
on public.financial_scores for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy finbot_history_select_own
on public.finbot_history for select to authenticated
using ((select auth.uid()) = user_id);

create policy finbot_history_insert_own
on public.finbot_history for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy finbot_history_update_own
on public.finbot_history for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- -----------------------------------------------------------------------------
-- Permissões da API do Supabase
-- -----------------------------------------------------------------------------

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.transactions to authenticated;
grant select, insert, update, delete on public.goals to authenticated;
grant select, insert on public.achievements to authenticated;
grant select, update on public.notifications to authenticated;
grant select, update on public.financial_scores to authenticated;
grant select, insert, update on public.finbot_history to authenticated;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;

commit;
