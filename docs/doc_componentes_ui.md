# Documentação dos Componentes Compartilháveis

Guia rápido dos componentes de UI do projeto. A ideia aqui é simples: abriu, entendeu, usou.

---

# AlertDialog

Modal de confirmação para ações sensíveis.

## Quando usar

Use quando uma ação precisa de confirmação antes de continuar, como excluir um registro, cancelar uma operação ou bloquear um item.

Não use para aviso simples. Para isso, prefira `Dialog` ou feedback visual na tela.

## Importação

```jsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
```

## Exemplo básico

```jsx
<AlertDialog>
  <AlertDialogTrigger>Excluir</AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação não poderá ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Confirmar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| size | `"default" \| "sm"` | `"default"` | Tamanho do conteúdo |
| variant | `string` | `"default"` | Variante do botão de ação |
| className | `string` | `undefined` | Classes extras |
| children | `ReactNode` | `undefined` | Conteúdo do componente |

## Exemplo real

```jsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir cliente</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir cliente?</AlertDialogTitle>
      <AlertDialogDescription>
        O cliente será removido da listagem e essa ação não poderá ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Observações

Use para decisões importantes. Se o usuário não precisa pensar antes de confirmar, provavelmente não precisa de `AlertDialog`.

---

# Badge

Marcador visual pequeno para status, categorias e contadores.

## Quando usar

Use para mostrar estado, tipo, etiqueta ou informação curta dentro de cards, tabelas e listas.

Não use para ações principais. Badge informa, botão executa.

## Importação

```jsx
import { Badge } from "@/components/ui/badge"
```

## Exemplo básico

```jsx
<Badge>Ativo</Badge>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| variant | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | Estilo visual |
| asChild | `boolean` | `false` | Renderiza usando o filho como elemento |
| className | `string` | `undefined` | Classes extras |
| children | `ReactNode` | `undefined` | Conteúdo do badge |

## Exemplo real

```jsx
<TableCell>
  <Badge variant={cliente.ativo ? "default" : "secondary"}>
    {cliente.ativo ? "Ativo" : "Inativo"}
  </Badge>
</TableCell>
```

## Observações

Mantenha o texto curto. Badge com frase longa vira uma plaquinha torta no layout.

---

# Button

Botão base do projeto para ações, links e gatilhos de componentes.

## Quando usar

Use para ações do usuário: salvar, excluir, abrir modal, filtrar, avançar ou acessar uma tela.

Para ícones clicáveis, use os tamanhos `icon`, `icon-sm`, `icon-xs` ou `icon-lg`.

## Importação

```jsx
import { Button } from "@/components/ui/button"
```

## Exemplo básico

```jsx
<Button>Salvar</Button>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| variant | `"default" \| "outline" \| "secondary" \| "ghost" \| "destructive" \| "link"` | `"default"` | Estilo visual |
| size | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` | Tamanho do botão |
| asChild | `boolean` | `false` | Usa o filho como elemento renderizado |
| disabled | `boolean` | `false` | Desativa o botão |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<form onSubmit={handleSubmit} className="flex justify-end gap-2">
  <Button type="button" variant="outline" onClick={onCancel}>
    Cancelar
  </Button>

  <Button type="submit">
    Salvar cliente
  </Button>
</form>
```

## Observações

Use `variant="destructive"` só para ação perigosa. Se tudo é destrutivo, nada é destrutivo.

---

# Card

Bloco de conteúdo com estrutura para título, descrição, ação, corpo e rodapé.

## Quando usar

Use para agrupar informações relacionadas em dashboards, formulários, páginas de detalhes e resumos.

Se o conteúdo não tem agrupamento claro, uma `div` comum pode resolver melhor.

## Importação

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
```

## Exemplo básico

```jsx
<Card>
  <CardHeader>
    <CardTitle>Clientes</CardTitle>
    <CardDescription>Resumo dos clientes cadastrados.</CardDescription>
  </CardHeader>

  <CardContent>
    Total: 128
  </CardContent>
</Card>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| size | `"default" \| "sm"` | `"default"` | Controla espaçamento interno |
| className | `string` | `undefined` | Classes extras |
| children | `ReactNode` | `undefined` | Conteúdo do card |

## Exemplo real

```jsx
<Card>
  <CardHeader>
    <CardTitle>Faturamento</CardTitle>
    <CardDescription>Resumo financeiro do mês.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">Ver detalhes</Button>
    </CardAction>
  </CardHeader>

  <CardContent>
    <p className="text-2xl font-semibold">R$ 12.450,00</p>
  </CardContent>
</Card>
```

## Observações

Use `CardAction` para botão pequeno no canto do cabeçalho. Não enfie um formulário inteiro ali.

---

# Checkbox

Campo de marcação para seleção booleana.

## Quando usar

Use quando o usuário puder marcar ou desmarcar uma opção independente, como ativo, aceito termos ou selecionar linha da tabela.

Para ligar/desligar configuração imediata, prefira `Switch`.

## Importação

```jsx
import { Checkbox } from "@/components/ui/checkbox"
```

## Exemplo básico

```jsx
<Checkbox checked={ativo} onCheckedChange={setAtivo} />
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| checked | `boolean` | `undefined` | Estado marcado |
| onCheckedChange | `(checked) => void` | `undefined` | Função chamada ao alterar |
| disabled | `boolean` | `false` | Desativa o campo |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<div className="flex items-center gap-2">
  <Checkbox
    id="cliente-ativo"
    checked={form.ativo}
    onCheckedChange={(checked) => setForm({ ...form, ativo: checked })}
  />
  <Label htmlFor="cliente-ativo">Cliente ativo</Label>
</div>
```

## Observações

Sempre que possível, use com `Label`. Campo solto na tela é caça ao tesouro ruim.

---

# Dialog

Modal comum para exibir conteúdo, formulários e fluxos curtos.

## Quando usar

Use para abrir formulários rápidos, detalhes ou confirmações simples que não precisam do peso de um `AlertDialog`.

Evite usar para telas grandes demais. Se virou página dentro da página, talvez deva ser uma rota.

## Importação

```jsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
```

## Exemplo básico

```jsx
<Dialog>
  <DialogTrigger>Abrir</DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Novo cliente</DialogTitle>
      <DialogDescription>Preencha os dados principais.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| showCloseButton | `boolean` | `true` | Mostra botão de fechar no conteúdo |
| open | `boolean` | `undefined` | Controla abertura |
| onOpenChange | `(open) => void` | `undefined` | Função chamada ao abrir/fechar |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Novo produto</Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Cadastrar produto</DialogTitle>
      <DialogDescription>Informe os dados usados na loja.</DialogDescription>
    </DialogHeader>

    <div className="grid gap-3">
      <Input placeholder="Nome do produto" />
      <Input placeholder="Preço" />
    </div>

    <DialogFooter>
      <Button onClick={handleSave}>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Observações

`DialogContent` já pode renderizar botão de fechar. Desative com `showCloseButton={false}` quando fizer sentido.

---

# Drawer

Painel lateral ou inferior para ações e conteúdos auxiliares.

## Quando usar

Use para filtros, edição rápida, detalhes de item ou menus contextuais, principalmente em telas com pouco espaço.

Para confirmação de ação perigosa, use `AlertDialog`.

## Importação

```jsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
```

## Exemplo básico

```jsx
<Drawer>
  <DrawerTrigger>Filtros</DrawerTrigger>

  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filtros</DrawerTitle>
      <DrawerDescription>Refine os resultados da lista.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| direction | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Direção do drawer |
| open | `boolean` | `undefined` | Controla abertura |
| onOpenChange | `(open) => void` | `undefined` | Função chamada ao abrir/fechar |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<Drawer direction="right">
  <DrawerTrigger asChild>
    <Button variant="outline">Editar</Button>
  </DrawerTrigger>

  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Editar cliente</DrawerTitle>
      <DrawerDescription>Atualize as informações principais.</DrawerDescription>
    </DrawerHeader>

    <div className="grid gap-3 p-4">
      <Input placeholder="Nome" />
      <Input placeholder="Telefone" />
    </div>

    <DrawerFooter>
      <Button>Salvar alterações</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Observações

Bom para edição lateral. Ruim para processos longos com muitos passos.

---

# DropdownMenu

Menu suspenso para ações secundárias e opções contextuais.

## Quando usar

Use quando uma linha, card ou botão tiver várias ações possíveis, como editar, duplicar, arquivar ou excluir.

Não esconda ação principal dentro dele. Ação importante precisa aparecer.

## Importação

```jsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
```

## Exemplo básico

```jsx
<DropdownMenu>
  <DropdownMenuTrigger>Ações</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Editar</DropdownMenuItem>
    <DropdownMenuItem>Excluir</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| align | `"start" \| "center" \| "end"` | `"start"` | Alinhamento do conteúdo |
| sideOffset | `number` | `4` | Distância do gatilho |
| variant | `"default" \| "destructive"` | `"default"` | Estilo do item |
| inset | `boolean` | `undefined` | Adiciona recuo no item |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon-sm">...</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Cliente</DropdownMenuLabel>
    <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
    <DropdownMenuItem onClick={handleArchive}>Arquivar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onClick={handleDelete}>
      Excluir
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Observações

Use `variant="destructive"` em item perigoso. Para seleção com estado, existem `DropdownMenuCheckboxItem` e `DropdownMenuRadioItem`.

---

# Input

Campo de texto padrão do projeto.

## Quando usar

Use para entradas curtas como nome, e-mail, telefone, preço, cidade, código ou busca simples.

Para texto grande, use `Textarea`.

## Importação

```jsx
import { Input } from "@/components/ui/input"
```

## Exemplo básico

```jsx
<Input placeholder="Digite o nome" />
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| type | `string` | `undefined` | Tipo do input |
| value | `string` | `undefined` | Valor controlado |
| onChange | `(event) => void` | `undefined` | Função chamada ao digitar |
| placeholder | `string` | `undefined` | Texto de apoio |
| disabled | `boolean` | `false` | Desativa o campo |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<div className="grid gap-2">
  <Label htmlFor="nome">Nome do cliente</Label>
  <Input
    id="nome"
    value={form.nome}
    onChange={(event) => setForm({ ...form, nome: event.target.value })}
    placeholder="Ex: Maria Eduarda"
  />
</div>
```

## Observações

Para campo com ícone, botão ou prefixo, use `InputGroup`.

---

# InputGroup

Agrupador para input com ícone, texto, botão, prefixo ou sufixo.

## Quando usar

Use quando o campo precisa de complemento visual ou funcional, como busca com ícone, preço com `R$`, URL, atalho ou botão no final.

Não use se o `Input` sozinho resolve.

## Importação

```jsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

## Exemplo básico

```jsx
<InputGroup>
  <InputGroupAddon>
    <InputGroupText>R$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0,00" />
</InputGroup>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| align | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Posição do addon |
| type | `"button" \| "submit"` | `"button"` | Tipo do botão interno |
| variant | `string` | `"ghost"` | Variante do botão interno |
| size | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"` | Tamanho do botão interno |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<InputGroup>
  <InputGroupAddon>
    <InputGroupText>R$</InputGroupText>
  </InputGroupAddon>

  <InputGroupInput
    value={preco}
    onChange={(event) => setPreco(event.target.value)}
    placeholder="0,00"
  />

  <InputGroupAddon align="inline-end">
    <InputGroupButton onClick={handleClear}>Limpar</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

## Observações

`InputGroupInput` tira borda própria para encaixar no grupo. Não misture com `Input` comum dentro do grupo sem necessidade.

---

# Label

Rótulo para campos de formulário.

## Quando usar

Use para identificar campos como `Input`, `Textarea`, `Select`, `Checkbox` e `Switch`.

Ajuda na leitura do formulário e melhora a acessibilidade quando ligado pelo `htmlFor`.

## Importação

```jsx
import { Label } from "@/components/ui/label"
```

## Exemplo básico

```jsx
<Label htmlFor="email">E-mail</Label>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| htmlFor | `string` | `undefined` | ID do campo relacionado |
| className | `string` | `undefined` | Classes extras |
| children | `ReactNode` | `undefined` | Texto do rótulo |

## Exemplo real

```jsx
<div className="grid gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="cliente@email.com" />
</div>
```

## Observações

Evite placeholder como único texto do campo. Placeholder some quando o usuário digita.

---

# MultiSelect

Select com busca e múltipla seleção usando badges.

## Quando usar

Use quando o usuário puder escolher várias opções, como permissões, tags, tamanhos, categorias, responsáveis ou filtros.

Para escolha única com busca, use `SearchableSelect`.

## Importação

```jsx
import { MultiSelect } from "@/components/ui/multi-select"
```

## Exemplo básico

```jsx
"use client"

import * as React from "react"
import { MultiSelect } from "@/components/ui/multi-select"

const tamanhos = [
  { label: "PP", value: "pp" },
  { label: "P", value: "p" },
  { label: "M", value: "m" },
  { label: "G", value: "g" },
]

export function Exemplo() {
  const [selecionados, setSelecionados] = React.useState([])

  return (
    <MultiSelect
      value={selecionados}
      onValueChange={setSelecionados}
      options={tamanhos}
      placeholder="Selecione os tamanhos"
      searchPlaceholder="Buscar tamanho..."
    />
  )
}
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| value | `string[]` | `[]` | Valores selecionados |
| onValueChange | `(value) => void` | `undefined` | Função chamada ao alterar seleção |
| options | `array` | `[]` | Lista de opções |
| placeholder | `string` | `"Selecione..."` | Texto quando não há valor |
| searchPlaceholder | `string` | `"Buscar..."` | Texto do campo de busca |
| emptyMessage | `string` | `"Nenhum resultado encontrado."` | Mensagem sem resultados |
| disabled | `boolean` | `false` | Desativa o componente |
| maxVisible | `number` | `2` | Quantidade de badges visíveis |
| className | `string` | `undefined` | Classe do container |
| triggerClassName | `string` | `undefined` | Classe do botão |
| contentClassName | `string` | `undefined` | Classe do menu |

## Exemplo real

```jsx
<MultiSelect
  value={filtros.status}
  onValueChange={(value) => setFiltros({ ...filtros, status: value })}
  options={[
    { label: "Ativo", value: "ativo" },
    { label: "Inativo", value: "inativo" },
    { label: "Pendente", value: "pendente" },
  ]}
  placeholder="Filtrar por status"
  searchPlaceholder="Buscar status..."
/>
```

## Formato das opções

```jsx
const options = [
  {
    label: "Nome visível",
    value: "valor-unico",
    description: "Texto auxiliar opcional",
    disabled: false,
  },
]
```

## Observações

Use `value` como array de strings. Não use para escolha única. Para isso, use `SearchableSelect`.

---

# Pagination

Conjunto de componentes para navegação entre páginas.

## Quando usar

Use em tabelas, listagens e telas com muitos registros carregados por página.

Não use quando a lista é pequena ou quando o carregamento infinito faz mais sentido.

## Importação

```jsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
```

## Exemplo básico

```jsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" text="Anterior" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" text="Próxima" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| isActive | `boolean` | `undefined` | Marca a página atual |
| size | `string` | `"icon"` | Tamanho do link |
| text | `string` | `"Previous" / "Next"` | Texto dos botões anterior/próximo |
| href | `string` | `undefined` | Link da página |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        href={`?page=${page - 1}`}
        text="Anterior"
      />
    </PaginationItem>

    <PaginationItem>
      <PaginationLink href={`?page=${page}`} isActive>
        {page}
      </PaginationLink>
    </PaginationItem>

    <PaginationItem>
      <PaginationNext
        href={`?page=${page + 1}`}
        text="Próxima"
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Observações

Esse componente monta a UI. A regra de página atual, total e bloqueio de anterior/próxima fica com a tela que usa.

---

# SearchableSelect

Select com campo de busca para listas médias ou grandes.

## Quando usar

Use quando o usuário precisar escolher apenas uma opção em uma lista com muitos itens, como cliente, produto, categoria, cidade, corretor ou conta financeira.

Para listas pequenas, prefira o componente `Select`.

## Importação

```jsx
import { SearchableSelect } from "@/components/ui/searchable-select"
```

## Exemplo básico

```jsx
"use client"

import * as React from "react"
import { SearchableSelect } from "@/components/ui/searchable-select"

const clientes = [
  { label: "Maria Eduarda", value: "maria-eduarda" },
  { label: "Augusto", value: "augusto" },
  { label: "Athletic Club", value: "athletic-club" },
]

export function Exemplo() {
  const [cliente, setCliente] = React.useState("")

  return (
    <SearchableSelect
      value={cliente}
      onValueChange={setCliente}
      options={clientes}
      placeholder="Selecione um cliente"
      searchPlaceholder="Buscar cliente..."
    />
  )
}
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| value | `string` | `undefined` | Valor selecionado |
| onValueChange | `(value) => void` | `undefined` | Função chamada ao selecionar |
| options | `array` | `[]` | Lista de opções |
| placeholder | `string` | `"Selecione..."` | Texto quando não há valor |
| searchPlaceholder | `string` | `"Buscar..."` | Texto do campo de busca |
| emptyMessage | `string` | `"Nenhum resultado encontrado."` | Mensagem sem resultados |
| disabled | `boolean` | `false` | Desativa o componente |
| clearable | `boolean` | `true` | Permite limpar seleção |
| className | `string` | `undefined` | Classe do container |
| triggerClassName | `string` | `undefined` | Classe do botão |
| contentClassName | `string` | `undefined` | Classe do menu |

## Exemplo real

```jsx
<SearchableSelect
  value={form.clienteId}
  onValueChange={(value) => setForm({ ...form, clienteId: value })}
  options={clientes.map((cliente) => ({
    label: cliente.nome,
    value: cliente.id,
    description: cliente.telefone,
  }))}
  placeholder="Selecione o cliente"
  searchPlaceholder="Buscar por nome ou telefone..."
/>
```

## Formato das opções

```jsx
const options = [
  {
    label: "Nome visível",
    value: "valor-unico",
    description: "Texto auxiliar opcional",
    disabled: false,
  },
]
```

## Observações

Use `value` como string única. Não use para múltiplas escolhas. Para isso, use `MultiSelect`.

---

# Select

Select padrão para escolha única em listas pequenas.

## Quando usar

Use quando o usuário precisa escolher uma opção entre poucas alternativas, como status, tipo, categoria simples ou ordenação.

Se a lista cresce demais, use `SearchableSelect`.

## Importação

```jsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select"
```

## Exemplo básico

```jsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecione" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="ativo">Ativo</SelectItem>
    <SelectItem value="inativo">Inativo</SelectItem>
  </SelectContent>
</Select>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| value | `string` | `undefined` | Valor selecionado |
| onValueChange | `(value) => void` | `undefined` | Função chamada ao selecionar |
| size | `"default" \| "sm"` | `"default"` | Tamanho do trigger |
| position | `"item-aligned" \| "popper"` | `"item-aligned"` | Posicionamento do menu |
| align | `"start" \| "center" \| "end"` | `"center"` | Alinhamento do conteúdo |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<Select
  value={form.status}
  onValueChange={(value) => setForm({ ...form, status: value })}
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Status" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="ativo">Ativo</SelectItem>
    <SelectItem value="inativo">Inativo</SelectItem>
    <SelectItem value="pendente">Pendente</SelectItem>
  </SelectContent>
</Select>
```

## Observações

Funciona melhor com poucas opções. Select gigante sem busca é teste de paciência disfarçado.

---

# Switch

Controle liga/desliga para configurações booleanas.

## Quando usar

Use para ativar ou desativar uma configuração de forma direta, como exibir no site, ativo, receber notificações ou permitir venda.

Para seleção dentro de lista ou formulário com confirmação, `Checkbox` pode ser mais claro.

## Importação

```jsx
import { Switch } from "@/components/ui/switch"
```

## Exemplo básico

```jsx
<Switch checked={ativo} onCheckedChange={setAtivo} />
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| checked | `boolean` | `undefined` | Estado ligado/desligado |
| onCheckedChange | `(checked) => void` | `undefined` | Função chamada ao alterar |
| size | `"default" \| "sm"` | `"default"` | Tamanho do switch |
| disabled | `boolean` | `false` | Desativa o componente |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<div className="flex items-center justify-between rounded-md border p-3">
  <div>
    <Label htmlFor="aparecer-site">Aparecer no site</Label>
    <p className="text-sm text-muted-foreground">
      Quando desligado, o corretor fica oculto na vitrine.
    </p>
  </div>

  <Switch
    id="aparecer-site"
    checked={form.aparecer_site}
    onCheckedChange={(checked) =>
      setForm({ ...form, aparecer_site: checked })
    }
  />
</div>
```

## Observações

Use para mudanças simples e reversíveis. Não coloque ação crítica em switch sem confirmação.

---

# Table

Estrutura base para tabelas responsivas.

## Quando usar

Use para exibir dados em linhas e colunas, como clientes, produtos, transações, pedidos e usuários.

Para cards empilhados em mobile, avalie se tabela ainda é o melhor formato.

## Importação

```jsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
```

## Exemplo básico

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    <TableRow>
      <TableCell>Maria Eduarda</TableCell>
      <TableCell>Ativo</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| className | `string` | `undefined` | Classes extras |
| children | `ReactNode` | `undefined` | Conteúdo da tabela |

## Exemplo real

```jsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Cliente</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {pedidos.map((pedido) => (
      <TableRow key={pedido.id}>
        <TableCell>{pedido.cliente}</TableCell>
        <TableCell>
          <Badge variant="secondary">{pedido.status}</Badge>
        </TableCell>
        <TableCell className="text-right">{pedido.total}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Observações

O componente já cria container com overflow horizontal. Mesmo assim, não coloque 18 colunas e espere milagre.

---

# Textarea

Campo para texto longo.

## Quando usar

Use para descrições, observações, mensagens, anotações e textos que podem ter mais de uma linha.

Para texto curto, use `Input`.

## Importação

```jsx
import { Textarea } from "@/components/ui/textarea"
```

## Exemplo básico

```jsx
<Textarea placeholder="Digite uma observação" />
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| value | `string` | `undefined` | Valor controlado |
| onChange | `(event) => void` | `undefined` | Função chamada ao digitar |
| placeholder | `string` | `undefined` | Texto de apoio |
| disabled | `boolean` | `false` | Desativa o campo |
| className | `string` | `undefined` | Classes extras |

## Exemplo real

```jsx
<div className="grid gap-2">
  <Label htmlFor="observacoes">Observações</Label>
  <Textarea
    id="observacoes"
    value={form.observacoes}
    onChange={(event) =>
      setForm({ ...form, observacoes: event.target.value })
    }
    placeholder="Informações importantes sobre o atendimento"
  />
</div>
```

## Observações

Bom para texto livre. Para campos estruturados, prefira inputs separados.

---

# Tooltip

Balão curto de ajuda ou contexto ao passar o mouse/focar.

## Quando usar

Use para explicar ícones, botões compactos ou informações que precisam de apoio rápido.

Não use para conteúdo essencial. Se a pessoa precisa saber para seguir, deixe visível na tela.

## Importação

```jsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
```

## Exemplo básico

```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>?</TooltipTrigger>
    <TooltipContent>Informação adicional</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|---|---|---:|---|
| delayDuration | `number` | `0` | Tempo até abrir o tooltip |
| sideOffset | `number` | `0` | Distância do gatilho |
| className | `string` | `undefined` | Classes extras |
| children | `ReactNode` | `undefined` | Conteúdo do tooltip |

## Exemplo real

```jsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon-sm">?</Button>
    </TooltipTrigger>

    <TooltipContent>
      Esse valor aparece no relatório financeiro.
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Observações

Tooltip é tempero, não prato principal. Evite textos longos.
