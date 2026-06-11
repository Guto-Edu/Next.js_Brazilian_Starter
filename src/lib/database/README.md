# Database

Esta pasta existe para deixar claro onde entram conexões, clientes e helpers de banco de dados.

O starter não obriga um banco específico. A ideia é oferecer caminhos prontos sem transformar a base em um projeto preso ao Supabase, Prisma, Drizzle ou qualquer outro adapter.

## Estrutura

```txt
src/lib/database/
  README.md
  supabase/
    README.md
    client.js.example
    server.js.example
  local/
    README.md
```

## Quando usar cada pasta

### `supabase/`

Use quando o projeto for usar Supabase para banco, auth, storage, realtime ou policies com RLS.

### `local/`

Use quando o projeto for usar banco local ou conexão própria, como Postgres local, Docker, SQLite, Prisma, Drizzle, node-postgres ou outro adapter.

## Regra de ouro

Cliente de navegador nunca deve receber chave secreta.

Pode ir para o client:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Não pode ir para o client:

```env
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

## Sugestão de uso

Mantenha a conexão de banco aqui e deixe regra de negócio em `src/services`.

Exemplo:

```txt
src/lib/database/supabase/server.js
src/services/users-service.js
src/app/api/users/route.js
```

A rota chama o service. O service chama o banco. O componente chama a rota ou usa server actions, dependendo do projeto.

Isso evita que `app/api` vire um armário bagunçado com conexão, validação, regra de negócio e resposta HTTP tudo no mesmo arquivo.
