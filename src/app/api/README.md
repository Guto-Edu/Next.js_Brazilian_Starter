# API

Esta pasta concentra as rotas internas do projeto usando Route Handlers do App Router.

## Rotas incluídas

```txt
src/app/api/
  health/
    route.js
  help/
    route.js
```

## `/api/health`

Rota simples para testar se o projeto está respondendo.

Boa para:

- teste rápido depois do deploy;
- monitoramento básico;
- validar se o ambiente subiu corretamente;
- conferir `NODE_ENV` e timestamp da resposta.

Exemplo de resposta:

```json
{
  "ok": true,
  "service": "nextjs-brazilian-starter",
  "status": "healthy",
  "environment": "development",
  "timestamp": "2026-06-11T14:00:00.000Z"
}
```

## `/api/help`

Rota de ajuda para listar endpoints iniciais do starter.

Ela não substitui documentação real, mas ajuda quem acabou de clonar o projeto a entender o que já existe.

## Padrão recomendado

Para novas rotas, use este formato:

```txt
src/app/api/nome-da-rota/route.js
```

Exemplo:

```js
export async function GET() {
  return Response.json({ ok: true });
}
```

## Organização sugerida

```txt
api/
  health/
    route.js
  help/
    route.js
  users/
    route.js
  users/[id]/
    route.js
```

## Cuidados

- Não exponha chaves secretas em respostas da API.
- Valide entradas com Zod antes de salvar dados.
- Use `Cache-Control: no-store` em rotas que retornam dados sensíveis ou dinâmicos.
- Separe regra de negócio pesada em `src/services` ou `src/lib`, deixando a rota mais limpa.
