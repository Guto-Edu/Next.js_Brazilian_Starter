# Documentação do projeto

Esta pasta concentra documentos técnicos que ajudam a entender, manter e evoluir o projeto.

A ideia é manter aqui tudo o que explica decisões de arquitetura, padrões de código, componentes, utilitários, banco de dados e regras importantes da aplicação. Esses arquivos também podem ser usados como contexto para ferramentas de IA durante o desenvolvimento.

## Objetivo da pasta `docs`

Use esta pasta para guardar documentação que ajuda outro desenvolvedor a continuar o projeto sem precisar descobrir tudo pelo código.

Também use estes documentos como contexto quando for pedir ajuda para uma IA gerar código, corrigir bugs, criar novas telas ou revisar arquitetura. Quanto mais claro estiver o padrão do projeto, menor a chance da IA criar algo fora da estrutura.

## O que deve ficar aqui

### Documentação de arquitetura

Arquivos que explicam como o projeto está organizado.

Exemplos:

- Route groups usados no App Router
- Diferença entre área pública, área de autenticação e área interna
- Responsabilidade de cada layout
- Onde criar novas páginas
- Onde criar novos componentes
- Como separar regras de negócio, helpers e integrações

Sugestões de arquivos:

```txt
docs/architecture.md
docs/routes.md
docs/layouts.md
```

### Documentação de componentes

Arquivos explicando os componentes reutilizáveis do projeto.

Exemplos:

- Button
- Card
- Dialog
- Drawer
- Table
- Select
- MultiSelect
- SearchableSelect
- AlertDialog
- Tooltip
- InputGroup

Cada documento deve explicar:

- Para que o componente serve
- Quando usar
- Quando evitar
- Exemplo básico
- Props principais
- Padrão visual adotado no projeto

Sugestão de arquivo:

```txt
docs/components.md
```

### Documentação de contexts

Arquivos explicando os contextos globais usados na aplicação.

Exemplos:

- ToastContext
- SidebarContext
- Contextos futuros de autenticação, workspace, permissões ou tema

Cada documentação deve deixar claro:

- Qual problema o context resolve
- Onde o provider é registrado
- Qual hook deve ser usado
- Quais métodos estão disponíveis
- Exemplo de uso em componente

Sugestão de arquivo:

```txt
docs/contexts.md
```

### Documentação de providers

Arquivos explicando os providers globais do projeto.

Exemplos:

- AppProvider
- ThemeProvider
- QueryProvider
- ToastProvider
- Providers futuros

Cada documentação deve explicar:

- Responsabilidade de cada provider
- Ordem de composição
- Onde ele é usado
- O que não deve ser colocado nele

Sugestão de arquivo:

```txt
docs/providers.md
```

### Documentação de formatters e masks

Arquivos explicando utilitários de formatação e máscaras de input.

Exemplos:

- CPF
- CNPJ
- CPF/CNPJ
- Telefone
- CEP
- Data
- Data e hora
- Moeda
- Porcentagem
- Placa de veículo
- Número
- Slug

Cada documentação deve conter:

- Nome da função ou máscara
- Entrada esperada
- Saída esperada
- Exemplo de uso
- Observações importantes para payloads e dados crus

Sugestões de arquivos:

```txt
docs/formatters.md
docs/input-mask.md
```

### Documentação de banco de dados

O arquivo `Database.sql` deve guardar o SQL principal do banco de dados do projeto.

Use esse arquivo para manter o histórico técnico do banco, principalmente em projetos pequenos e médios onde ainda não existe uma pasta formal de migrations.

Sugestão:

```txt
docs/Database.sql
```

O `Database.sql` pode conter:

- Criação de extensões
- Criação de tabelas
- Alterações de tabelas
- Índices
- Constraints
- Triggers
- Functions
- Políticas de RLS
- Seeds de desenvolvimento, quando fizer sentido
- Comentários explicando decisões importantes

Evite colocar no `Database.sql`:

- Dados reais de clientes
- Senhas
- Tokens
- Chaves de API
- Informações sensíveis
- Dumps completos de produção

Para projetos maiores, considere separar o banco por arquivos:

```txt
docs/database/
  001_extensions.sql
  002_tables.sql
  003_indexes.sql
  004_triggers.sql
  005_policies.sql
  006_seeds.sql
```

## Como usar estes documentos como contexto para IA

Ao pedir para uma IA criar ou alterar código neste projeto, envie os arquivos relevantes da pasta `docs` junto com o pedido.

Exemplos:

### Criar uma nova tela interna

Envie como contexto:

```txt
docs/architecture.md
docs/layouts.md
docs/components.md
docs/contexts.md
```

### Criar um formulário

Envie como contexto:

```txt
docs/components.md
docs/input-mask.md
docs/formatters.md
```

### Criar uma tabela nova no banco

Envie como contexto:

```txt
docs/Database.sql
```

### Criar fluxo com toast e sidebar

Envie como contexto:

```txt
docs/contexts.md
docs/providers.md
docs/components.md
```

## Padrão recomendado para cada documento

Cada documento deve ser direto e fácil de consultar.

Estrutura recomendada:

```md
# Nome do documento

## Objetivo

Explique em poucas linhas o motivo deste documento existir.

## Quando usar

Liste situações reais em que esse padrão deve ser usado.

## Padrão adotado

Explique como o projeto faz hoje.

## Exemplo

Inclua um exemplo pequeno e funcional.

## Observações

Adicione regras, cuidados e decisões importantes.
```

## Regras para manter a documentação útil

- Atualize o documento quando mudar o código relacionado.
- Não documente coisa que não existe no projeto.
- Não use texto genérico só para encher arquivo.
- Prefira exemplo real a explicação longa.
- Mantenha nomes de arquivos, funções e pastas iguais aos do código.
- Separe documentação técnica de ideia de produto.
- Nunca coloque segredo, token, senha ou chave privada nesta pasta.

## Checklist antes de pedir código para IA

Antes de pedir para uma IA criar uma feature, confirme se ela recebeu contexto suficiente.

Use este checklist:

- A IA sabe qual stack o projeto usa?
- A IA sabe a estrutura de pastas?
- A IA sabe onde criar a página?
- A IA sabe quais componentes usar?
- A IA sabe quais providers e contexts já existem?
- A IA sabe quais formatters e masks já estão prontos?
- A IA sabe como o banco está estruturado?
- A IA sabe qual padrão visual deve seguir?

Quanto mais completo for o contexto, menor a chance de sair código desalinhado com o projeto.

## Estrutura sugerida para a pasta

```txt
docs/
  README.md
  Database.sql
  architecture.md
  layouts.md
  components.md
  contexts.md
  providers.md
  formatters.md
  input-mask.md
  api.md
  database.md
```

Essa estrutura pode crescer conforme o projeto ganhar módulos, mas o ideal é manter a pasta simples e fácil de navegar.
