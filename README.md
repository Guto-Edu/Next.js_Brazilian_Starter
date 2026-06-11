# Next.js Brazilian Starter

Starter público para criar projetos em **Next.js** com uma base inicial já organizada: App Router, route groups, layouts por área, UI reutilizável, providers globais, contexts, tema, máscaras de input, formatters brasileiros, rotas de API e estrutura inicial para banco de dados.

A proposta é simples: reduzir o tempo perdido no setup inicial e entregar uma base que um desenvolvedor consiga clonar, entender e adaptar para um produto real.

## O que este projeto entrega

- Estrutura com `src/app` usando **App Router**.
- Separação por route groups: `(public)`, `(auth)` e `(app)`.
- Layouts independentes para área pública, autenticação e dashboard.
- Providers globais para tema, React Query e notificações.
- Contexts para toast e sidebar.
- Componentes de UI baseados em `shadcn/ui`, Radix/Base UI e Tailwind.
- Hook de máscara de input para dados comuns no Brasil.
- Formatters para CPF, CNPJ, telefone, CEP, moeda, datas, porcentagem, placa e slug.
- Estrutura preparada para Supabase ou banco local.
- Rotas de API iniciais para healthcheck e ajuda.
- Página pública funcionando como vitrine técnica do starter.

## Stack principal

| Tecnologia | Uso no projeto |
|---|---|
| Next.js 16 | Framework principal com App Router |
| React 19 | Interface e composição de componentes |
| Tailwind CSS 4 | Estilização |
| shadcn/ui | Base dos componentes de interface |
| Radix UI / Base UI | Primitivos acessíveis de UI |
| TanStack Query | Cache, server state e requisições |
| React Hook Form | Formulários |
| Zod | Validação de dados |
| Sonner | Notificações toast |
| next-themes | Tema claro, escuro e system |
| Lucide React | Ícones |
| date-fns | Manipulação de datas |
| Recharts | Gráficos |
| ExcelJS / XLSX | Exportação e leitura de planilhas |

## Estrutura de pastas

```txt
src/
  app/
    layout.js
    globals.css

    (public)/
      layout.js
      page.js

    (auth)/
      layout.js
      login/
      register/

    (app)/
      layout.js
      dashboard/

    api/
      README.md
      health/
      help/

  components/
    layout/
      app-shell.jsx
      auth-layout.jsx
      dashboard-shell.jsx
      dashboard-header.jsx
      dashboard-sidebar.jsx
      dashboard-footer.jsx
      site-header.jsx
      site-footer.jsx
    ui/
      ...

  context/
    sidebar-context.jsx
    toast-context.jsx

  hooks/
    use-input-mask.js

  lib/
    database/
      local/
      supabase/
    constants.js
    formatters.js
    utils.js
    validations.js

  providers/
    app-provider.jsx
    query-provider.jsx
    theme-provider.jsx
    toast-provider.jsx

proxy.js
```

## Route groups

O projeto usa route groups para separar responsabilidades sem alterar a URL final.

| Grupo | Função | Exemplos de rota |
|---|---|---|
| `(public)` | Área pública do projeto | `/` |
| `(auth)` | Telas de autenticação | `/login`, `/register` |
| `(app)` | Área interna da aplicação | `/dashboard` |
| `api` | Route handlers do App Router | `/api/health`, `/api/help` |

Exemplo:

```txt
src/app/(public)/page.js      -> /
src/app/(auth)/login/page.js  -> /login
src/app/(app)/dashboard/page.js -> /dashboard
```

A pasta entre parênteses organiza o código, mas não entra no caminho da URL.

## Layouts

Cada área tem um layout próprio.

| Arquivo | Responsabilidade |
|---|---|
| `src/app/layout.js` | Root layout. Carrega HTML, body, CSS global e providers. |
| `src/app/(public)/layout.js` | Layout da área pública com `AppShell`, header e footer do site. |
| `src/app/(auth)/layout.js` | Layout limpo para login e cadastro. |
| `src/app/(app)/layout.js` | Layout interno com dashboard shell, sidebar, header e footer. |

A ideia é evitar um root layout pesado. Header, footer e sidebar não devem ficar no layout raiz, porque nem todas as áreas precisam da mesma estrutura visual.

## Providers

Os providers globais ficam centralizados em `src/providers`.

| Provider | Responsabilidade |
|---|---|
| `AppProvider` | Composição dos providers globais do projeto. |
| `ThemeProvider` | Tema claro, escuro e system usando `next-themes`. |
| `QueryProvider` | Configuração do TanStack Query e Devtools em desenvolvimento. |
| `ToastProvider` | Renderização global do Sonner. |

Uso esperado no root layout:

```jsx
// src/app/layout.js
import { AppProvider } from "@/providers/app-provider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
```

## Contexts

Os contexts ficam em `src/context`.

### SidebarContext

Controle global de abertura e fechamento da sidebar.

Principais retornos:

```txt
isSidebarOpen
openSidebar
closeSidebar
toggleSidebar
```

Uso sugerido:

```jsx
import { useSidebar } from "@/context/sidebar-context";

export function SidebarButton() {
  const { toggleSidebar } = useSidebar();

  return <button onClick={toggleSidebar}>Menu</button>;
}
```

### ToastContext

Cria uma API própria para notificações, evitando importar `sonner` em toda tela.

Principais métodos:

```txt
showSuccess
showError
showInfo
showWarning
showLoading
showPromise
clearToasts
```

Uso sugerido:

```jsx
import { useToast } from "@/context/toast-context";

export function SaveButton() {
  const toast = useToast();

  function handleSave() {
    toast.showSuccess("Registro salvo com sucesso.");
  }

  return <button onClick={handleSave}>Salvar</button>;
}
```

## Componentes de UI

O starter já traz uma base de componentes para construir telas comuns de sistema, dashboard, landing page e área administrativa.

Componentes disponíveis:

| Componente | Uso comum |
|---|---|
| `AlertDialog` | Confirmação de ações sensíveis. |
| `Badge` | Status, categoria ou marcador curto. |
| `Button` | Ações principais, secundárias e ícones. |
| `Card` | Agrupamento de conteúdo. |
| `Checkbox` | Seleção booleana. |
| `Dialog` | Modal para formulário curto ou detalhes. |
| `Drawer` | Painel lateral ou inferior para filtros e edição rápida. |
| `DropdownMenu` | Menu contextual de ações. |
| `Input` | Campo de texto. |
| `InputGroup` | Campo com prefixo, sufixo, botão ou ícone. |
| `Label` | Rótulo acessível de formulário. |
| `MultiSelect` | Seleção múltipla com busca. |
| `Pagination` | Navegação entre páginas. |
| `SearchableSelect` | Seleção única com busca. |
| `Select` | Seleção única simples. |
| `Switch` | Liga/desliga. |
| `Table` | Listagens tabulares. |
| `Textarea` | Texto longo. |
| `Tooltip` | Ajuda curta em elementos compactos. |

Exemplo:

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo módulo</CardTitle>
      </CardHeader>

      <CardContent>
        <Button>Começar</Button>
      </CardContent>
    </Card>
  );
}
```

## Máscaras de input

O hook `useInputMask` centraliza máscaras para formulários brasileiros.

Máscaras disponíveis:

```txt
CPF
CNPJ
CPF_CNPJ
PHONE
CEP
DATE
MONTH_YEAR
TIME
DATE_TIME
CURRENCY
PERCENT
PLATE
NUMBER
```

Exemplo:

```jsx
import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";
import { Input } from "@/components/ui/input";

export function CPFInput() {
  const cpf = useInputMask("", INPUT_MASKS.CPF);

  return (
    <Input
      value={cpf.value}
      onChange={cpf.onChange}
      placeholder="000.000.000-00"
    />
  );
}
```

Para envio ao backend, use o valor limpo:

```js
const payload = {
  cpf: cpf.rawValue,
};
```

## Formatters brasileiros

A pasta `src/lib` inclui formatters para exibir dados no padrão brasileiro.

Exemplos:

| Função | Entrada | Saída |
|---|---:|---|
| `formatCPF` | `12345678900` | `123.456.789-00` |
| `formatCNPJ` | `12345678000199` | `12.345.678/0001-99` |
| `formatPhoneBR` | `32999990000` | `(32) 99999-0000` |
| `formatCEP` | `36300000` | `36300-000` |
| `formatCurrencyBR` | `123456` | `R$ 1.234,56` |
| `formatDateBR` | `11062026` | `11/06/2026` |
| `formatDateTimeBR` | `110620261430` | `11/06/2026 14:30` |
| `formatVehiclePlate` | `ABC1234` | `ABC-1234` |
| `formatSlug` | `São João del Rei!` | `sao-joao-del-rei` |

## Banco de dados

O projeto não força uma escolha de banco. Ele deixa a estrutura preparada para adaptação.

```txt
src/lib/database/
  README.md

  supabase/
    README.md
    client.js.example
    server.js.example

  local/
    README.md
    client.js.example
```

### Supabase

Use a pasta `supabase` quando o projeto precisar de Postgres gerenciado, autenticação, storage, realtime ou policies.

Fluxo recomendado:

1. Copie os arquivos `.example`.
2. Renomeie para os arquivos reais do projeto.
3. Configure as variáveis no `.env.local`.
4. Crie os helpers específicos do domínio em pastas separadas.

### Banco local

Use a pasta `local` se quiser adaptar o starter para Prisma, Drizzle, SQLite, Postgres local ou outra solução.

## Rotas de API

Rotas iniciais disponíveis:

| Rota | Uso |
|---|---|
| `/api/health` | Verificar se o app está online. |
| `/api/help` | Retornar informações básicas de suporte ou documentação. |

Exemplo de route handler:

```js
export async function GET() {
  return Response.json({
    status: "ok",
    app: "nextjs-brazilian-starter",
    timestamp: new Date().toISOString(),
  });
}
```

Use `src/app/api` para webhooks, integrações externas, validações server-side e endpoints internos.

Para regras maiores, evite colocar tudo dentro do `route.js`. Crie serviços ou módulos por domínio, por exemplo:

```txt
src/services/
  customers/
  products/
  billing/
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Guto-Edu/nextjs-brazilian-starter.git
cd nextjs-brazilian-starter
```

Instale as dependências:

```bash
npm install
```

Ou, se preferir pnpm:

```bash
pnpm install
```

Crie o arquivo de ambiente:

```bash
cp .env.example .env.local
```

Rode o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a build de produção. |
| `npm run start` | Inicia o app em modo produção. |
| `npm run lint` | Executa o ESLint. |

## Variáveis de ambiente

O projeto inclui `.env.example`. Ajuste conforme a stack escolhida.

Exemplo comum para projetos com Supabase:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Next.js Brazilian Starter"

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

DATABASE_URL=
```

Nem toda variável é obrigatória para rodar a base inicial. Configure apenas o que seu projeto realmente usar.

## Convenções adotadas

- Componentes globais ficam em `src/components`.
- Componentes de layout ficam em `src/components/layout`.
- Componentes reutilizáveis de interface ficam em `src/components/ui`.
- Providers ficam em `src/providers`.
- Contexts ficam em `src/context`.
- Hooks ficam em `src/hooks`.
- Helpers, validações, formatters e utilidades ficam em `src/lib`.
- Route handlers ficam em `src/app/api`.
- Áreas do app ficam separadas por route groups.

## Como adaptar para um produto real

1. Renomeie o projeto no `package.json`.
2. Atualize metadados, favicon e textos públicos.
3. Troque cores, tipografia e tokens globais no CSS.
4. Defina o banco de dados que será usado.
5. Configure autenticação.
6. Crie os domínios do produto, como clientes, produtos, pedidos ou financeiro.
7. Remova exemplos que não serão usados.
8. Mantenha apenas um gerenciador de pacotes e um lockfile.

Sobre o último ponto: o projeto pode ser executado com npm ou pnpm, mas o ideal é escolher um padrão para evitar divergência entre `package-lock.json` e `pnpm-lock.yaml`.

## Indicado para

- Sistemas administrativos.
- Dashboards.
- SaaS.
- Portais internos.
- MVPs com login, painel e CRUDs.
- Projetos que precisam de interface pronta para evoluir.
- Desenvolvedores que querem começar acima do setup básico.

## Pode ser excesso para

- Landing page muito simples.
- Site institucional de poucas páginas.
- Projeto que não precisa de dashboard, providers, tabela, formulário ou rotas internas.

Nesses casos, uma base menor pode ser mais adequada.

## Página pública do starter

A home do projeto apresenta os principais recursos da base:

- route groups;
- layouts;
- estrutura de pastas;
- database helpers;
- rotas de API;
- inventário de componentes;
- playground de UI;
- formatters;
- input masks;
- providers;
- contexts;
- stack principal.

Essa página serve como documentação visual para quem acessar o projeto pela primeira vez.

## Desenvolvimento

Durante o desenvolvimento, algumas recomendações ajudam a manter o projeto limpo:

- Não coloque regra de negócio dentro de componente de UI.
- Não duplique formatter dentro de página.
- Não importe `sonner` em vários lugares se o `ToastContext` já resolve isso.
- Não transforme o root layout em layout visual do site.
- Não misture tela pública, tela de auth e dashboard no mesmo grupo.
- Não deixe helpers específicos demais dentro de `utils.js`; quando crescer, crie arquivos por domínio.

## Próximos passos possíveis

Ideias boas para evoluir o starter:

- fluxo completo de autenticação;
- middleware de sessão;
- exemplo de CRUD;
- exemplo de tabela com filtros;
- exemplo de formulário com React Hook Form e Zod;
- testes;
- documentação em `/docs`;
- tema com tokens customizados;
- exemplo de deploy;
- exemplo de integração com Supabase.

## Contribuição

Contribuições são bem-vindas.

Antes de abrir um pull request:

1. Rode o lint.
2. Verifique se a alteração não quebra a estrutura base.
3. Mantenha o padrão de pastas.
4. Documente componentes, hooks ou providers novos.
5. Evite adicionar dependência sem necessidade clara.

## Licença

MIT

## Autor

Desenvolvido por um dev brasileiro para acelerar o início de projetos em Next.js sem transformar o primeiro dia de trabalho em configuração repetida.

GitHub: [Guto-Edu](https://github.com/Guto-Edu)

## Documentation

- [Comece Aqui](/START.md)
- [Start Here](/START_(en).md)
- [ReadMe in English](/README_(en).md)
