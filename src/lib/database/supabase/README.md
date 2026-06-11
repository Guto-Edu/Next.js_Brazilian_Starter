# Supabase

Esta pasta guarda os clientes do Supabase para browser e server.

Os arquivos estão como `.example` de propósito. Assim o starter continua genérico e não quebra o projeto de quem não usa Supabase.

## Instalação

Quando for usar Supabase, instale:

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

## Variáveis de ambiente

Adicione no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Se o projeto precisar de rotinas administrativas no servidor, você pode adicionar:

```env
SUPABASE_SERVICE_ROLE_KEY=
```

A chave `service_role` nunca deve ser usada em componente client.

## Como ativar os arquivos

Renomeie:

```txt
client.js.example -> client.js
server.js.example -> server.js
```

## Client do navegador

Use em componentes com `"use client"`.

```js
import { createClient } from "@/lib/database/supabase/client";

const supabase = createClient();
```

## Client do servidor

Use em Server Components, Route Handlers e Server Actions.

```js
import { createClient } from "@/lib/database/supabase/server";

const supabase = await createClient();
```

## Cuidados

- Ative RLS nas tabelas expostas ao client.
- Não use `service_role` no navegador.
- Valide dados com Zod antes de inserir ou atualizar.
- Centralize queries repetidas em `src/services`.
