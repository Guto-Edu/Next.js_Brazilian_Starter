-- ============================================================
-- DATABASE.SQL
-- Projeto: Next.js Brazilian Starter
-- Banco: PostgreSQL / Supabase
--
-- Objetivo:
-- Este arquivo serve como exemplo base de estrutura de banco para
-- projetos criados a partir deste starter.
--
-- Ele também pode ser usado como contexto para IA entender:
-- - quais tabelas existem;
-- - quais relacionamentos existem;
-- - quais campos são esperados;
-- - quais regras de acesso estão previstas;
-- - como o projeto organiza dados principais.
--
-- Importante:
-- Este arquivo é um exemplo. Antes de rodar em produção,
-- revise nomes de tabelas, permissões, políticas RLS e regras de negócio.
-- ============================================================


-- ============================================================
-- EXTENSÕES
-- ============================================================

create extension if not exists "pgcrypto";


-- ============================================================
-- TIPOS ENUMERADOS
-- ============================================================

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'app_role'
      and n.nspname = 'public'
  ) then
    create type public.app_role as enum (
      'owner',
      'admin',
      'editor',
      'viewer'
    );
  end if;
end $$;


do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'app_status'
      and n.nspname = 'public'
  ) then
    create type public.app_status as enum (
      'active',
      'inactive',
      'archived'
    );
  end if;
end $$;


do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'item_status'
      and n.nspname = 'public'
  ) then
    create type public.item_status as enum (
      'draft',
      'pending',
      'in_progress',
      'done',
      'canceled'
    );
  end if;
end $$;


do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'priority_level'
      and n.nspname = 'public'
  ) then
    create type public.priority_level as enum (
      'low',
      'medium',
      'high',
      'urgent'
    );
  end if;
end $$;


-- ============================================================
-- FUNÇÃO PADRÃO DE UPDATED_AT
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- TABELA: PROFILES
--
-- Representa o usuário dentro da aplicação.
-- No Supabase, o id normalmente referencia auth.users(id).
-- ============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  full_name text,
  email text,
  avatar_url text,

  role public.app_role not null default 'viewer',
  status public.app_status not null default 'active',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_full_name_check
    check (
      full_name is null
      or length(trim(full_name)) >= 2
    )
);


drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();


-- ============================================================
-- TABELA: PROJECTS
--
-- Representa uma plataforma, workspace, sistema, loja, cliente
-- ou qualquer unidade principal de organização.
--
-- Em um SaaS, essa tabela costuma ser o centro do projeto.
-- ============================================================

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),

  owner_id uuid not null references public.profiles(id) on delete cascade,

  name text not null,
  slug text not null unique,
  description text,

  status public.app_status not null default 'active',
  is_public boolean not null default false,

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint projects_name_check
    check (length(trim(name)) >= 2),

  constraint projects_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);


drop trigger if exists set_projects_updated_at on public.projects;

create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();


-- ============================================================
-- TABELA: PROJECT_MEMBERS
--
-- Controla quais usuários participam de cada projeto/workspace.
-- ============================================================

create table if not exists public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,

  role public.app_role not null default 'viewer',

  invited_by uuid references public.profiles(id) on delete set null,
  invited_at timestamptz not null default now(),
  accepted_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  primary key (project_id, user_id)
);


drop trigger if exists set_project_members_updated_at on public.project_members;

create trigger set_project_members_updated_at
before update on public.project_members
for each row
execute function public.set_updated_at();


-- ============================================================
-- FUNÇÃO: ADICIONAR DONO COMO MEMBRO DO PROJETO
-- ============================================================

create or replace function public.add_project_owner_as_member()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.project_members (
    project_id,
    user_id,
    role,
    accepted_at
  )
  values (
    new.id,
    new.owner_id,
    'owner',
    now()
  )
  on conflict (project_id, user_id)
  do nothing;

  return new;
end;
$$;


drop trigger if exists add_project_owner_as_member on public.projects;

create trigger add_project_owner_as_member
after insert on public.projects
for each row
execute function public.add_project_owner_as_member();


-- ============================================================
-- TABELA: CATEGORIES
--
-- Exemplo de tabela auxiliar vinculada a um projeto.
-- Pode representar categorias, grupos, setores, coleções etc.
-- ============================================================

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references public.projects(id) on delete cascade,

  name text not null,
  slug text not null,
  description text,

  status public.app_status not null default 'active',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint categories_name_check
    check (length(trim(name)) >= 2),

  constraint categories_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),

  constraint categories_project_slug_unique
    unique (project_id, slug)
);


drop trigger if exists set_categories_updated_at on public.categories;

create trigger set_categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();


-- ============================================================
-- TABELA: ITEMS
--
-- Exemplo de tabela principal de registros.
-- Pode virar produtos, tarefas, pedidos, pacientes, imóveis,
-- lançamentos financeiros, documentos ou qualquer entidade do app.
-- ============================================================

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references public.projects(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,

  title text not null,
  description text,

  status public.item_status not null default 'draft',
  priority public.priority_level not null default 'medium',

  amount numeric(12, 2) not null default 0,

  starts_at timestamptz,
  due_at timestamptz,
  finished_at timestamptz,

  metadata jsonb not null default '{}'::jsonb,

  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint items_title_check
    check (length(trim(title)) >= 2),

  constraint items_amount_check
    check (amount >= 0)
);


drop trigger if exists set_items_updated_at on public.items;

create trigger set_items_updated_at
before update on public.items
for each row
execute function public.set_updated_at();


-- ============================================================
-- TABELA: FILES
--
-- Exemplo para guardar referência de arquivos enviados.
-- O arquivo real pode estar no Supabase Storage, S3, Cloudflare R2 etc.
-- ============================================================

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references public.projects(id) on delete cascade,
  item_id uuid references public.items(id) on delete cascade,

  storage_bucket text not null default 'uploads',
  file_path text not null,
  file_name text not null,
  file_type text,
  file_size_bytes bigint,

  uploaded_by uuid references public.profiles(id) on delete set null,

  created_at timestamptz not null default now(),

  constraint files_path_check
    check (length(trim(file_path)) > 0),

  constraint files_name_check
    check (length(trim(file_name)) > 0),

  constraint files_size_check
    check (
      file_size_bytes is null
      or file_size_bytes >= 0
    )
);


-- ============================================================
-- TABELA: AUDIT_LOGS
--
-- Guarda histórico de ações importantes.
-- Útil para dashboard administrativo, rastreabilidade e debug.
-- ============================================================

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),

  project_id uuid references public.projects(id) on delete cascade,

  actor_id uuid references public.profiles(id) on delete set null,

  action text not null,
  entity_type text not null,
  entity_id uuid,

  old_values jsonb,
  new_values jsonb,

  ip_address text,
  user_agent text,

  created_at timestamptz not null default now(),

  constraint audit_logs_action_check
    check (length(trim(action)) >= 2),

  constraint audit_logs_entity_type_check
    check (length(trim(entity_type)) >= 2)
);


-- ============================================================
-- ÍNDICES
-- ============================================================

create index if not exists idx_profiles_email
on public.profiles (email);

create index if not exists idx_profiles_status
on public.profiles (status);

create index if not exists idx_projects_owner_id
on public.projects (owner_id);

create index if not exists idx_projects_slug
on public.projects (slug);

create index if not exists idx_projects_status
on public.projects (status);

create index if not exists idx_project_members_user_id
on public.project_members (user_id);

create index if not exists idx_project_members_project_id
on public.project_members (project_id);

create index if not exists idx_categories_project_id
on public.categories (project_id);

create index if not exists idx_categories_slug
on public.categories (slug);

create index if not exists idx_items_project_id
on public.items (project_id);

create index if not exists idx_items_category_id
on public.items (category_id);

create index if not exists idx_items_status
on public.items (status);

create index if not exists idx_items_priority
on public.items (priority);

create index if not exists idx_items_created_by
on public.items (created_by);

create index if not exists idx_files_project_id
on public.files (project_id);

create index if not exists idx_files_item_id
on public.files (item_id);

create index if not exists idx_audit_logs_project_id
on public.audit_logs (project_id);

create index if not exists idx_audit_logs_actor_id
on public.audit_logs (actor_id);

create index if not exists idx_audit_logs_entity
on public.audit_logs (entity_type, entity_id);

create index if not exists idx_audit_logs_created_at
on public.audit_logs (created_at desc);


-- ============================================================
-- FUNÇÕES AUXILIARES DE PERMISSÃO
--
-- Essas funções são usadas nas policies RLS.
-- Elas dependem de auth.uid(), disponível no Supabase.
-- ============================================================

create or replace function public.is_project_member(target_project_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.projects p
    where p.id = target_project_id
      and p.owner_id = auth.uid()
  )
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = target_project_id
      and pm.user_id = auth.uid()
      and pm.accepted_at is not null
  );
$$;


create or replace function public.can_manage_project(target_project_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.projects p
    where p.id = target_project_id
      and p.owner_id = auth.uid()
  )
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = target_project_id
      and pm.user_id = auth.uid()
      and pm.accepted_at is not null
      and pm.role in ('owner', 'admin', 'editor')
  );
$$;


-- ============================================================
-- ROW LEVEL SECURITY
--
-- As policies abaixo são pensadas para Supabase.
-- Em PostgreSQL puro, remova ou adapte auth.uid().
-- ============================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.categories enable row level security;
alter table public.items enable row level security;
alter table public.files enable row level security;
alter table public.audit_logs enable row level security;


-- ============================================================
-- POLICIES: PROFILES
-- ============================================================

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
);


drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (
  id = auth.uid()
);


drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);


-- ============================================================
-- POLICIES: PROJECTS
-- ============================================================

drop policy if exists "projects_select_member" on public.projects;
create policy "projects_select_member"
on public.projects
for select
to authenticated
using (
  public.is_project_member(id)
  or is_public = true
);


drop policy if exists "projects_insert_owner" on public.projects;
create policy "projects_insert_owner"
on public.projects
for insert
to authenticated
with check (
  owner_id = auth.uid()
);


drop policy if exists "projects_update_manager" on public.projects;
create policy "projects_update_manager"
on public.projects
for update
to authenticated
using (
  public.can_manage_project(id)
)
with check (
  public.can_manage_project(id)
);


drop policy if exists "projects_delete_owner" on public.projects;
create policy "projects_delete_owner"
on public.projects
for delete
to authenticated
using (
  owner_id = auth.uid()
);


-- ============================================================
-- POLICIES: PROJECT_MEMBERS
-- ============================================================

drop policy if exists "project_members_select_member" on public.project_members;
create policy "project_members_select_member"
on public.project_members
for select
to authenticated
using (
  public.is_project_member(project_id)
);


drop policy if exists "project_members_insert_manager" on public.project_members;
create policy "project_members_insert_manager"
on public.project_members
for insert
to authenticated
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "project_members_update_manager" on public.project_members;
create policy "project_members_update_manager"
on public.project_members
for update
to authenticated
using (
  public.can_manage_project(project_id)
)
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "project_members_delete_manager" on public.project_members;
create policy "project_members_delete_manager"
on public.project_members
for delete
to authenticated
using (
  public.can_manage_project(project_id)
);


-- ============================================================
-- POLICIES: CATEGORIES
-- ============================================================

drop policy if exists "categories_select_member" on public.categories;
create policy "categories_select_member"
on public.categories
for select
to authenticated
using (
  public.is_project_member(project_id)
);


drop policy if exists "categories_insert_manager" on public.categories;
create policy "categories_insert_manager"
on public.categories
for insert
to authenticated
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "categories_update_manager" on public.categories;
create policy "categories_update_manager"
on public.categories
for update
to authenticated
using (
  public.can_manage_project(project_id)
)
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "categories_delete_manager" on public.categories;
create policy "categories_delete_manager"
on public.categories
for delete
to authenticated
using (
  public.can_manage_project(project_id)
);


-- ============================================================
-- POLICIES: ITEMS
-- ============================================================

drop policy if exists "items_select_member" on public.items;
create policy "items_select_member"
on public.items
for select
to authenticated
using (
  public.is_project_member(project_id)
);


drop policy if exists "items_insert_manager" on public.items;
create policy "items_insert_manager"
on public.items
for insert
to authenticated
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "items_update_manager" on public.items;
create policy "items_update_manager"
on public.items
for update
to authenticated
using (
  public.can_manage_project(project_id)
)
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "items_delete_manager" on public.items;
create policy "items_delete_manager"
on public.items
for delete
to authenticated
using (
  public.can_manage_project(project_id)
);


-- ============================================================
-- POLICIES: FILES
-- ============================================================

drop policy if exists "files_select_member" on public.files;
create policy "files_select_member"
on public.files
for select
to authenticated
using (
  public.is_project_member(project_id)
);


drop policy if exists "files_insert_manager" on public.files;
create policy "files_insert_manager"
on public.files
for insert
to authenticated
with check (
  public.can_manage_project(project_id)
);


drop policy if exists "files_delete_manager" on public.files;
create policy "files_delete_manager"
on public.files
for delete
to authenticated
using (
  public.can_manage_project(project_id)
);


-- ============================================================
-- POLICIES: AUDIT_LOGS
-- ============================================================

drop policy if exists "audit_logs_select_member" on public.audit_logs;
create policy "audit_logs_select_member"
on public.audit_logs
for select
to authenticated
using (
  project_id is null
  or public.is_project_member(project_id)
);


drop policy if exists "audit_logs_insert_authenticated" on public.audit_logs;
create policy "audit_logs_insert_authenticated"
on public.audit_logs
for insert
to authenticated
with check (
  actor_id = auth.uid()
);


-- ============================================================
-- EXEMPLOS DE SEED
--
-- Esses inserts são apenas referência.
-- Normalmente, em projetos reais, o profile é criado após o signup.
-- ============================================================

-- insert into public.projects (
--   owner_id,
--   name,
--   slug,
--   description,
--   is_public
-- )
-- values (
--   auth.uid(),
--   'Projeto Exemplo',
--   'projeto-exemplo',
--   'Projeto criado para testar o starter.',
--   false
-- );


-- insert into public.categories (
--   project_id,
--   name,
--   slug,
--   description
-- )
-- values (
--   '00000000-0000-0000-0000-000000000000',
--   'Geral',
--   'geral',
--   'Categoria padrão do projeto.'
-- );


-- insert into public.items (
--   project_id,
--   category_id,
--   title,
--   description,
--   status,
--   priority,
--   amount,
--   created_by
-- )
-- values (
--   '00000000-0000-0000-0000-000000000000',
--   null,
--   'Primeiro item',
--   'Registro inicial para testar listagem, filtros e detalhes.',
--   'pending',
--   'medium',
--   0,
--   auth.uid()
-- );


-- ============================================================
-- CHECKLIST PARA ADAPTAR EM UM PROJETO REAL
--
-- 1. Renomear projects para a entidade principal, se necessário.
-- 2. Renomear items para produto, pedido, paciente, imóvel, tarefa etc.
-- 3. Revisar roles: owner, admin, editor, viewer.
-- 4. Ajustar policies RLS conforme regra de negócio.
-- 5. Criar tabelas específicas do domínio.
-- 6. Criar views para dashboards e relatórios.
-- 7. Criar functions para operações sensíveis.
-- 8. Criar migrations versionadas antes de produção.
-- ============================================================