# Banco local ou conexão própria

Use esta pasta quando o projeto não for usar Supabase ou quando a conexão principal vier de outro adapter.

Exemplos comuns:

- Postgres local com Docker;
- SQLite;
- Prisma;
- Drizzle;
- node-postgres;
- API externa própria;
- banco hospedado fora do Supabase.

## Estrutura sugerida

```txt
src/lib/database/local/
  README.md
  client.js
  migrations/
  seeds/
```

## Exemplo conceitual

```js
export function createDatabaseClient() {
  // Configure aqui o client do banco escolhido.
  // Exemplo: Prisma, Drizzle, pg, SQLite ou outro adapter.
}
```

## Variáveis de ambiente comuns

```env
DATABASE_URL=
```

Nunca exponha `DATABASE_URL` em componente client. Ela deve ser usada apenas no servidor.

## Dica prática

Se o projeto for público, deixe esta pasta como orientação e coloque a implementação real apenas quando o banco for escolhido.

Starter bom não casa a pessoa com um banco sem ela aceitar o pedido primeiro.
