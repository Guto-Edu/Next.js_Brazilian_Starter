## Comece por aqui

Você pode usar este starter como base para um novo projeto em Next.js.

### 1. Clone o repositório

```bash
git clone https://github.com/Guto-Edu/nextjs-brazilian-starter.git
```

Entre na pasta do projeto:

```bash
cd nextjs-brazilian-starter
```

### 2. Instale as dependências

Com npm:

```bash
npm install
```

Ou com pnpm:

```bash
pnpm install
```

Escolha apenas um gerenciador de pacotes no projeto. Se for usar npm, mantenha o `package-lock.json`. Se for usar pnpm, mantenha o `pnpm-lock.yaml`.

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Depois edite o `.env.local` com as variáveis do seu projeto.

Para rodar a base inicial, nem todas as variáveis precisam estar preenchidas. Configure primeiro apenas o que for necessário para a stack que você vai usar.

### 4. Rode o servidor de desenvolvimento

Com npm:

```bash
npm run dev
```

Ou com pnpm:

```bash
pnpm dev
```

Acesse no navegador:

```txt
http://localhost:3000
```

### 5. Comece a adaptar o projeto

Depois que o projeto estiver rodando, os primeiros ajustes recomendados são:

1. Renomear o projeto no `package.json`.
2. Atualizar título, descrição, favicon e metadados.
3. Trocar textos, links e identidade visual da página pública.
4. Configurar o banco escolhido em `src/lib/database`.
5. Ajustar ou remover exemplos que não serão usados.
6. Criar os domínios reais do projeto, como clientes, produtos, pedidos, financeiro ou usuários.
7. Revisar os arquivos da pasta `docs` para entender providers, contexts, formatters, componentes e estrutura do banco.

A partir daqui, a base já está pronta para evoluir para um dashboard, SaaS, sistema interno, portal administrativo ou MVP com autenticação e CRUDs.
