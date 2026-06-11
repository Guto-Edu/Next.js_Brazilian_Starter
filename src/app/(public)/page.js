"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Code2,
  Computer,
  Database,
  DatabaseZap,
  FileCode2,
  FolderTree,
  Gauge,
  Home,
  KeyRound,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LockKeyhole,
  LogIn,
  PanelLeft,
  Rocket,
  Route,
  Search,
  ServerCog,
  ShieldCheck,
  TextCursorInput,
  UserPlus,
  Workflow,
} from "lucide-react";

const githubUrl = "https://github.com/Guto-Edu";

const navStats = [
  { value: "19", label: "componentes UI" },
  { value: "3", label: "route groups" },
  { value: "3", label: "layouts por área" },
  { value: "2", label: "rotas de API" },
  { value: "18+", label: "formatters BR" },
];

const highlights = [
  {
    title: "UI pronta para produto real",
    description:
      "Componentes de formulário, navegação, feedback, tabela e overlays já documentados e reutilizáveis.",
    icon: LayoutGrid,
  },
  {
    title: "Route groups sem bagunça",
    description:
      "Pastas como (public), (auth) e (app) separam áreas do projeto sem aparecer na URL.",
    icon: Route,
  },
  {
    title: "Layouts com responsabilidade clara",
    description:
      "O layout raiz segura providers. O público usa AppShell. O auth remove distrações. O app ganha dashboard shell.",
    icon: Layers,
  },
  {
    title: "Brasil first",
    description:
      "CPF, CNPJ, telefone, CEP, moeda, data, hora, porcentagem e placa prontos para usar em sistemas nacionais.",
    icon: TextCursorInput,
  },
];

const providers = [
  {
    name: "ThemeProvider",
    detail:
      "next-themes com class no html, system mode e troca sem piscada visual.",
  },
  {
    name: "QueryProvider",
    detail:
      "TanStack Query com staleTime, cache, retry controlado e Devtools no ambiente de desenvolvimento.",
  },
  {
    name: "ToastContextProvider",
    detail:
      "Uma API própria para sucesso, erro, aviso, loading, promise e limpeza de notificações.",
  },
  {
    name: "SidebarContextProvider",
    detail:
      "Estado global para abrir, fechar e alternar a sidebar sem empurrar props pela aplicação.",
  },
  {
    name: "ToastProvider",
    detail:
      "Renderização centralizada do Sonner, com rich colors, close button e posição padrão.",
  },
];

const contexts = [
  {
    name: "SidebarContext",
    methods: "isSidebarOpen, openSidebar, closeSidebar, toggleSidebar",
    description:
      "Resolve navegação lateral no mobile e em layouts administrativos.",
  },
  {
    name: "ToastContext",
    methods:
      "showSuccess, showError, showInfo, showWarning, showLoading, showPromise",
    description: "Padroniza notificações sem importar sonner em todo componente.",
  },
];

const routeGroups = [
  {
    folder: "(public)",
    route: "/",
    title: "Área pública",
    description:
      "Guarda landing, exemplos, documentação visual e páginas abertas. Usa o layout público com AppShell, header, footer e navegação do site.",
    icon: Home,
  },
  {
    folder: "(auth)",
    route: "/login e /register",
    title: "Área de autenticação",
    description:
      "Guarda login, registro e recuperação de senha. Usa um layout próprio para remover header, footer e sidebar do site.",
    icon: LockKeyhole,
  },
  {
    folder: "(app)",
    route: "/dashboard",
    title: "Área interna",
    description:
      "Guarda dashboard e telas logadas. Usa um layout de aplicação com header, sidebar e footer internos.",
    icon: LayoutDashboard,
  },
  {
    folder: "api",
    route: "/api/health e /api/help",
    title: "Rotas de API",
    description:
      "Concentra route handlers do App Router. Ideal para healthcheck, helpers internos, webhooks e integrações.",
    icon: ServerCog,
  },
];

const layoutLayers = [
  {
    file: "src/app/layout.js",
    label: "Root layout",
    description:
      "Fica fora dos grupos. Deve carregar apenas html, body, CSS global e providers globais. Não coloque header, footer ou sidebar aqui.",
    icon: Layers,
  },
  {
    file: "src/app/(public)/layout.js",
    label: "Public layout",
    description:
      "Carrega a casca pública do projeto. É aqui que entram AppShell, site header, site footer e sidebar pública quando existir.",
    icon: Home,
  },
  {
    file: "src/app/(auth)/layout.js",
    label: "Auth layout",
    description:
      "Remove a casca pública para login e registro ficarem limpos, focados e sem sidebar disputando atenção com o formulário.",
    icon: KeyRound,
  },
  {
    file: "src/app/(app)/layout.js",
    label: "Dashboard layout",
    description:
      "Entrega uma estrutura interna com DashboardShell, sidebar, header e footer próprios para telas logadas.",
    icon: PanelLeft,
  },
];

const componentInventory = [
  {
    name: "AlertDialog",
    group: "Overlay",
    usage: "Confirma ações sensíveis antes de continuar.",
    code: "<AlertDialog>...</AlertDialog>",
  },
  {
    name: "Badge",
    group: "Data display",
    usage: "Mostra status, categoria ou marcador curto.",
    code: '<Badge variant="secondary">Ativo</Badge>',
  },
  {
    name: "Button",
    group: "Action",
    usage: "Ação principal, secundária, link ou botão de ícone.",
    code: "<Button>Salvar</Button>",
  },
  {
    name: "Card",
    group: "Layout",
    usage: "Agrupa conteúdo com header, corpo, ação e rodapé.",
    code: "<Card><CardHeader /></Card>",
  },
  {
    name: "Checkbox",
    group: "Form",
    usage: "Seleção booleana dentro de formulário ou tabela.",
    code: "<Checkbox checked={ativo} />",
  },
  {
    name: "Dialog",
    group: "Overlay",
    usage: "Modal para formulário curto, detalhes ou decisão simples.",
    code: "<Dialog><DialogTrigger /></Dialog>",
  },
  {
    name: "Drawer",
    group: "Overlay",
    usage: "Painel lateral ou inferior para filtros e edição rápida.",
    code: '<Drawer direction="right">...</Drawer>',
  },
  {
    name: "DropdownMenu",
    group: "Navigation",
    usage: "Menu contextual para ações secundárias.",
    code: "<DropdownMenu>...</DropdownMenu>",
  },
  {
    name: "Input",
    group: "Form",
    usage: "Campo curto de texto, e-mail, busca, preço ou código.",
    code: '<Input placeholder="Nome" />',
  },
  {
    name: "InputGroup",
    group: "Form",
    usage: "Input com prefixo, sufixo, botão ou ícone encaixado.",
    code: "<InputGroup><InputGroupInput /></InputGroup>",
  },
  {
    name: "Label",
    group: "Form",
    usage: "Rótulo acessível para campos de formulário.",
    code: '<Label htmlFor="email">E-mail</Label>',
  },
  {
    name: "MultiSelect",
    group: "Form",
    usage: "Seleção múltipla com busca e itens selecionados.",
    code: "<MultiSelect options={options} />",
  },
  {
    name: "Pagination",
    group: "Navigation",
    usage: "Navegação entre páginas de listagens.",
    code: "<Pagination>...</Pagination>",
  },
  {
    name: "SearchableSelect",
    group: "Form",
    usage: "Escolha única em listas médias ou grandes com busca.",
    code: "<SearchableSelect options={options} />",
  },
  {
    name: "Select",
    group: "Form",
    usage: "Escolha única em listas pequenas.",
    code: "<Select><SelectTrigger /></Select>",
  },
  {
    name: "Switch",
    group: "Form",
    usage: "Liga/desliga configurações simples e reversíveis.",
    code: "<Switch checked={enabled} />",
  },
  {
    name: "Table",
    group: "Data display",
    usage: "Exibe registros em linhas e colunas.",
    code: "<Table><TableBody /></Table>",
  },
  {
    name: "Textarea",
    group: "Form",
    usage: "Campo para observações, descrições e textos longos.",
    code: '<Textarea placeholder="Observações" />',
  },
  {
    name: "Tooltip",
    group: "Feedback",
    usage: "Ajuda curta para ícones, atalhos e controles compactos.",
    code: "<Tooltip><TooltipContent /></Tooltip>",
  },
];

const formatters = [
  { name: "formatCPF", input: "12345678900", output: "123.456.789-00" },
  {
    name: "formatCNPJ",
    input: "12345678000199",
    output: "12.345.678/0001-99",
  },
  { name: "formatPhoneBR", input: "32999990000", output: "(32) 99999-0000" },
  { name: "formatCEP", input: "36300000", output: "36300-000" },
  { name: "formatCurrencyBR", input: "123456", output: "R$ 1.234,56" },
  { name: "formatDateBR", input: "11062026", output: "11/06/2026" },
  {
    name: "formatDateTimeBR",
    input: "110620261430",
    output: "11/06/2026 14:30",
  },
  { name: "formatVehiclePlate", input: "ABC1234", output: "ABC-1234" },
  { name: "formatSlug", input: "São João del Rei!", output: "sao-joao-del-rei" },
];

const masks = [
  "CPF",
  "CNPJ",
  "CPF_CNPJ",
  "PHONE",
  "CEP",
  "DATE",
  "MONTH_YEAR",
  "TIME",
  "DATE_TIME",
  "CURRENCY",
  "PERCENT",
  "PLATE",
  "NUMBER",
];

const stack = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS 4",
  "shadcn/ui",
  "TanStack Query",
  "React Hook Form",
  "Zod",
  "Sonner",
  "Lucide React",
  "next-themes",
];

const searchableOptions = [
  {
    label: "Cliente",
    value: "cliente",
    description: "Fluxos de CRM e pedidos",
  },
  {
    label: "Produto",
    value: "produto",
    description: "Catálogo e estoque",
  },
  {
    label: "Financeiro",
    value: "financeiro",
    description: "Contas, transações e métricas",
  },
];

const multiOptions = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Formulários", value: "forms" },
  { label: "Tabela", value: "table" },
  { label: "Tema", value: "theme" },
];

function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <div
      className={[
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      <div
        className={[
          "mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground",
          align === "center" ? "justify-center" : "",
        ].join(" ")}
      >
        <span className="h-px w-8 bg-border" />
        {eyebrow}
        <span className="h-px w-8 bg-border" />
      </div>

      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto rounded-3xl bg-neutral-950 p-5 text-sm leading-7 text-neutral-100 shadow-2xl shadow-black/20 dark:bg-black/50">
      <code>{children}</code>
    </pre>
  );
}

function HeroSystemGraphic() {
  return (
    <div className="relative mx-auto flex min-h-[520px] w-full max-w-[620px] items-center justify-center lg:min-h-[620px]">
      <div className="absolute inset-8 rounded-[2rem] border border-border/70 bg-card/40 shadow-2xl shadow-black/10 backdrop-blur" />
      <div className="absolute inset-x-16 top-16 h-24 rounded-[2rem] bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />

      <div className="relative grid w-full max-w-[500px] gap-4 p-4">
        <div className="group rounded-[2rem] border border-border/70 bg-background/90 p-4 shadow-xl shadow-black/10 transition duration-500 hover:-translate-y-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                Starter cockpit
              </p>
              <p className="text-xs text-muted-foreground">
                rotas, layouts e UI prontos para clonar
              </p>
            </div>
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-blue-500" />
              <span className="size-2 rounded-full bg-muted-foreground/40" />
              <span className="size-2 rounded-full bg-muted-foreground/40" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {navStats.slice(0, 3).map((item) => (
              <div key={item.label} className="rounded-2xl bg-muted/60 p-3">
                <p className="text-2xl font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-border/70 bg-card/80 p-4 transition duration-500 hover:-translate-y-1">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
              <FolderTree className="size-5" />
            </div>
            <p className="mt-5 text-sm font-medium text-foreground">
              Route groups
            </p>
            <div className="mt-4 space-y-2">
              {["(public)", "(auth)", "(app)", "api"].map((item) => (
                <div
                  key={item}
                  className="rounded-full bg-muted/60 px-3 py-2 font-mono text-xs text-muted-foreground"
                >
                  src/app/{item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-card/80 p-4 transition duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Visualização rápida
                </p>
                <p className="text-xs text-muted-foreground">
                  acesse as áreas do starter
                </p>
              </div>
              <Badge variant="secondary">preview</Badge>
            </div>

            <div className="mt-5 grid gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/login">
                  <LogIn className="size-4" />
                  Login
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/register">
                  <UserPlus className="size-4" />
                  Sign-up
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UiPlayground() {
  const [selectedModules, setSelectedModules] = useState([
    "dashboard",
    "forms",
  ]);
  const [selectedArea, setSelectedArea] = useState("cliente");
  const [notifications, setNotifications] = useState(true);
  const [terms, setTerms] = useState(true);

  return (
    <TooltipProvider delayDuration={80}>
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden border-border/70 bg-card/70 shadow-none">
          <CardHeader>
            <CardTitle>Playground de formulário</CardTitle>
            <CardDescription>
              Um bloco vivo usando Input, InputGroup, Label, Checkbox, Switch,
              Select, MultiSelect, SearchableSelect, Textarea, Tooltip e Button.
            </CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Ajuda do playground"
                  >
                    <Search className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Exemplo compacto para copiar o padrão visual.
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Nome do produto</Label>
              <Input id="project-name" defaultValue="Next.js Brazilian Starter" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-price">Preço base</Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>R$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="project-price" defaultValue="1.234,56" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>limpar</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Área do starter</Label>
                <SearchableSelect
                  value={selectedArea}
                  onValueChange={setSelectedArea}
                  options={searchableOptions}
                  placeholder="Selecione a área"
                  searchPlaceholder="Buscar área..."
                />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select defaultValue="pronto">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Publicação</SelectLabel>
                      <SelectItem value="pronto">Pronto</SelectItem>
                      <SelectItem value="ajustando">Ajustando</SelectItem>
                      <SelectSeparator />
                      <SelectItem value="rascunho">Rascunho</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Módulos que entram no MVP</Label>
              <MultiSelect
                value={selectedModules}
                onValueChange={setSelectedModules}
                options={multiOptions}
                placeholder="Selecione módulos"
                searchPlaceholder="Buscar módulo..."
              />
            </div>

            <div className="grid gap-3 rounded-3xl bg-muted/50 p-4 sm:grid-cols-2">
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <Checkbox checked={terms} onCheckedChange={setTerms} />
                Aceitar padrão de documentação
              </label>

              <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span>Notificações globais</span>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-notes">Notas de implementação</Label>
              <Textarea
                id="project-notes"
                defaultValue="Trocar apenas identidade, rotas e regras de negócio. A base já entrega layout, providers, contexts, UI e utilitários BR."
                className="min-h-28"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2">
            <Button>Salvar exemplo</Button>
            <Button variant="outline">Duplicar padrão</Button>
            <Button variant="ghost">Ver documentação</Button>
          </CardFooter>
        </Card>

        <div className="grid gap-4">
          <Card className="border-border/70 bg-card/70 shadow-none">
            <CardHeader>
              <CardTitle>Overlays e menus</CardTitle>
              <CardDescription>
                Dialog, Drawer, DropdownMenu e AlertDialog sem inventar moda.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Abrir Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo recurso</DialogTitle>
                    <DialogDescription>
                      Use esse padrão para cadastros curtos, detalhes e ações
                      rápidas.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-2">
                    <Input placeholder="Nome do recurso" />
                    <Textarea placeholder="Descrição curta" />
                  </div>
                  <DialogFooter>
                    <Button>Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline">Abrir Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filtros da listagem</DrawerTitle>
                    <DrawerDescription>
                      Painel lateral para filtros, edição rápida ou detalhes de
                      um registro.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="grid gap-3 p-4">
                    <Input placeholder="Buscar por nome" />
                    <Select defaultValue="ativo">
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DrawerFooter>
                    <Button>Aplicar filtros</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Ações</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Recurso</DropdownMenuLabel>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Duplicar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Confirmar ação</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esse padrão serve para ações que realmente precisam de
                      confirmação.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/70 shadow-none">
            <CardHeader>
              <CardTitle>Tabela, status e paginação</CardTitle>
              <CardDescription>
                Badge, Table e Pagination trabalhando juntos no padrão de
                listagem.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Base</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Providers</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Configurado</Badge>
                    </TableCell>
                    <TableCell className="text-right">global</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Route groups</TableCell>
                    <TableCell>
                      <Badge variant="outline">App Router</Badge>
                    </TableCell>
                    <TableCell className="text-right">app</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dashboard</TableCell>
                    <TableCell>
                      <Badge>preview</Badge>
                    </TableCell>
                    <TableCell className="text-right">app</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious text="Anterior" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext text="Próxima" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section
        id="inicio"
        className="relative isolate min-h-[calc(100svh-5rem)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.10),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-x-4 top-6 -z-10 h-[620px] rounded-[3rem] border border-border/70 bg-card/50 [mask-image:linear-gradient(to_bottom,black,transparent)] sm:inset-x-6 lg:inset-x-8" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)]">
          <div className="pt-14 lg:pt-20">
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-500" />
                Open source starter
              </span>
              <span>Next.js</span>
              <span>Tailwind v4</span>
              <span>shadcn/ui</span>
              <span>App Router</span>
            </div>

            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl xl:text-7xl">
              Um starter Next.js para começar com arquitetura, UI e rotas no
              lugar certo.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-muted-foreground">
              Base pública para projetos com layout, tema, providers, contexts,
              componentes de UI, máscaras, formatters brasileiros, áreas
              separadas por route groups, dashboard, auth e API inicial.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Link href={githubUrl} target="_blank" rel="noreferrer">
                  <Computer className="size-4" />
                  Abrir GitHub
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background/60"
              >
                <Link href="/login">
                  <LogIn className="size-4" />
                  Ver login
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background/60"
              >
                <Link href="/register">
                  <UserPlus className="size-4" />
                  Ver sign-up
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background/60"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  Ver dashboard
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-5">
              {navStats.map((item) => (
                <div
                  key={item.label}
                  className="bg-background/80 p-4 backdrop-blur md:p-5"
                >
                  <p className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground md:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HeroSystemGraphic />
        </div>
      </section>

      <section id="overview" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Base do projeto"
            title="Tudo o que costuma atrasar o primeiro commit já vem encaixado."
            description="A página inicial funciona como vitrine técnica do starter. Quem cair no repositório entende rápido o que existe, por que existe e onde começar."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group bg-background p-6 transition duration-300 hover:bg-muted/40 lg:p-8"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition duration-300 group-hover:scale-105 dark:text-blue-300">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="rotas" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Route groups"
            title="Pastas entre parênteses organizam o projeto sem mudar a URL."
            description="No App Router, grupos como (public), (auth) e (app) servem para separar áreas, layouts e responsabilidades. O nome da pasta não aparece no endereço final."
            align="center"
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {routeGroups.map((group) => {
              const Icon = group.icon;

              return (
                <Card
                  key={group.folder}
                  className="border-border/70 bg-card/70 shadow-none"
                >
                  <CardHeader>
                    <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="font-mono text-base">
                      {group.folder}
                    </CardTitle>
                    <CardDescription>{group.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="font-mono">
                      {group.route}
                    </Badge>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {group.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <CodeBlock>{`src/app/
  layout.js

  (public)/
    layout.js
    page.js
    examples/
      page.js

  (auth)/
    layout.js
    login/
      page.js
    register/
      page.js

  (app)/
    layout.js
    dashboard/
      page.js

  api/
    README.md
    health/
      route.js
    help/
      route.js`}</CodeBlock>

            <Card className="border-border/70 bg-card/70 shadow-none">
              <CardHeader>
                <CardTitle>Por que usar route groups?</CardTitle>
                <CardDescription>
                  Porque projeto grande sem divisão vira gaveta de cabo velho.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  A pasta <span className="font-mono text-foreground">(public)</span>{" "}
                  guarda páginas abertas, mas a URL continua limpa. A home segue
                  em <span className="font-mono text-foreground">/</span>.
                </p>
                <p>
                  A pasta <span className="font-mono text-foreground">(auth)</span>{" "}
                  permite login e registro com layout próprio, sem herdar o
                  header e footer do site.
                </p>
                <p>
                  A pasta <span className="font-mono text-foreground">(app)</span>{" "}
                  separa telas internas, como dashboard, relatórios e
                  configurações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="layouts" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Layouts"
              title="Cada área possui seu próprio layout."
              description="O layout raiz não deve carregar navegação visual. Ele segura só a base global. Os grupos cuidam do visual de cada área."
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild variant="outline">
                <Link href="/login">
                  <LogIn className="size-4" />
                  Login sem AppShell
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register">
                  <UserPlus className="size-4" />
                  Registro sem AppShell
                </Link>
              </Button>
              <Button
                asChild
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  Dashboard shell
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {layoutLayers.map((layout) => {
              const Icon = layout.icon;

              return (
                <Card
                  key={layout.file}
                  className="border-border/70 bg-card/70 shadow-none"
                >
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle>{layout.label}</CardTitle>
                      <CardDescription className="mt-2 font-mono">
                        {layout.file}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {layout.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}

            <CodeBlock>{`// src/app/layout.js
// Aqui ficam só providers globais.
// Não coloque AppShell aqui.

<AppProvider>
  {children}
</AppProvider>

// src/app/(public)/layout.js
<AppShell>
  {children}
</AppShell>

// src/app/(auth)/layout.js
<AuthLayout>
  {children}
</AuthLayout>

// src/app/(app)/layout.js
<DashboardShell>
  {children}
</DashboardShell>`}</CodeBlock>
          </div>
        </div>
      </section>

      <section id="estrutura" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Estrutura"
              title="Organização previsível, estrutura do projeto já formada."
              description="A estrutura separa layout, UI, providers, contexts, hooks, libs, database helpers, API e telas por área."
            />
          </div>

          <div className="grid gap-4">
            <CodeBlock>{`src/
  app/
    layout.js
    globals.css

    (public)/
      layout.js
      page.js
      examples/
        page.js

    (auth)/
      layout.js
      login/
        page.js
      register/
        page.js

    (app)/
      layout.js
      dashboard/
        page.js

    api/
      README.md
      health/
        route.js
      help/
        route.js

  components/
    layout/
      app-shell.jsx
      auth-layout.jsx
      dashboard-shell.jsx
      dashboard-sidebar.jsx
      dashboard-header.jsx
      dashboard-footer.jsx
    ui/
      button.jsx
      card.jsx
      dialog.jsx
      input.jsx
      table.jsx
      ...

  context/
    sidebar-context.jsx
    toast-context.jsx

  hooks/
    use-input-mask.js

  lib/
    database/
      README.md
      supabase/
        README.md
        client.js.example
        server.js.example
      local/
        README.md
        client.js.example
    formatters.js
    utils.js

  providers/
    app-provider.jsx
    query-provider.jsx
    theme-provider.jsx
    toast-provider.jsx

proxy.js`}</CodeBlock>

            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
              {[
                [
                  "components/ui",
                  "Interface compartilhada com 19 peças documentadas.",
                ],
                [
                  "app route groups",
                  "Áreas públicas, auth e dashboard separadas sem sujar URL.",
                ],
                [
                  "lib/database",
                  "Helpers opcionais para Supabase e banco local.",
                ],
              ].map(([title, description]) => (
                <div key={title} className="bg-background p-6">
                  <p className="font-mono text-sm text-blue-600 dark:text-blue-300">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="database" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-[2.5rem] border border-border bg-card/60 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <SectionHeader
                eyebrow="Database helpers"
                title="Banco preparado, mas sem prender o starter a uma stack."
                description="A pasta lib/database mostra onde colocar conexão com Supabase ou banco local. O projeto continua genérico, mas já tem trilho para crescer."
              />

              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="secondary">Supabase opcional</Badge>
                <Badge variant="outline">Local database</Badge>
                <Badge variant="outline">README por pasta</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="border-border/70 bg-background/70 shadow-none">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                    <Database className="size-5" />
                  </div>
                  <div>
                    <CardTitle>lib/database</CardTitle>
                    <CardDescription>
                      Ponto oficial para conexões e helpers de banco.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <CodeBlock>{`src/lib/database/
  README.md

  supabase/
    README.md
    client.js.example
    server.js.example

  local/
    README.md
    client.js.example`}</CodeBlock>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/70 bg-background/70 shadow-none">
                  <CardHeader>
                    <CardTitle>Supabase</CardTitle>
                    <CardDescription>
                      Para projetos com auth, storage, realtime e Postgres
                      gerenciado.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-2xl bg-muted/60 p-4 font-mono text-xs leading-7 text-muted-foreground">
                      client.js.example
                      <br />
                      server.js.example
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/70 bg-background/70 shadow-none">
                  <CardHeader>
                    <CardTitle>Banco local</CardTitle>
                    <CardDescription>
                      Para quem quiser adaptar Prisma, Drizzle, SQLite,
                      Postgres local ou outro caminho.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-2xl bg-muted/60 p-4 font-mono text-xs leading-7 text-muted-foreground">
                      local/client.js.example
                      <br />
                      DATABASE_URL
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="api" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="API routes"
              title="Rotas internas prontas para healthcheck e documentação."
              description="A pasta api guarda route handlers do App Router. É um começo simples para testar deploy, integrações e respostas JSON."
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button asChild variant="outline">
                <Link href="/api/health" target="_blank">
                  <Gauge className="size-4" />
                  Abrir /api/health
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/api/help" target="_blank">
                  <ServerCog className="size-4" />
                  Abrir /api/help
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-border/70 bg-card/70 shadow-none">
              <CardHeader>
                <CardTitle>Exemplo de retorno</CardTitle>
                <CardDescription>
                  Útil para testar se o app subiu corretamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>{`// src/app/api/health/route.js

export async function GET() {
  return Response.json({
    status: "ok",
    app: "nextjs-brazilian-starter",
    timestamp: new Date().toISOString(),
  });
}`}</CodeBlock>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/70 shadow-none">
              <CardHeader>
                <CardTitle>Quando usar API no starter?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  Use para webhooks, validações server-side, integrações com
                  serviços externos, healthcheck e pequenas operações internas.
                </p>
                <p>
                  Para regras grandes demais, crie serviços separados em{" "}
                  <span className="font-mono text-foreground">src/services</span>{" "}
                  ou handlers organizados por domínio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

            <section id="componentes" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="UI system"
            title="Os 19 componentes aparecem com função, uso e exemplo."
            description="A vitrine mostra inventário, playground e padrões reais para o dev entender como usar a UI do starter."
            align="center"
          />

          <div className="mt-12">
            <UiPlayground />
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-background">
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-3">
              {componentInventory.map((component) => (
                <div
                  key={component.name}
                  className="group p-5 transition duration-300 hover:bg-muted/40 md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {component.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {component.group}
                      </p>
                    </div>

                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition group-hover:text-blue-600 dark:group-hover:text-blue-300">
                      <Code2 className="size-4" />
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {component.usage}
                  </p>

                  <div className="mt-5 rounded-2xl bg-muted/60 px-3 py-2 font-mono text-xs text-muted-foreground">
                    {component.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="formatters" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Dados brasileiros"
              title="Formatters e input masks deixam o formulário falar português."
              description="CPF, CNPJ, telefone, CEP, data, moeda e placa não deveriam ser reescritos em todo sistema. Aqui ficam centralizados e fáceis de testar."
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {masks.map((mask) => (
                <div
                  key={mask}
                  className="rounded-2xl bg-muted/50 px-4 py-3 font-mono text-xs text-muted-foreground"
                >
                  INPUT_MASKS.{mask}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-border/70 bg-card/70 shadow-none">
              <CardHeader>
                <CardTitle>Exemplos de saída</CardTitle>
                <CardDescription>
                  O valor entra cru e sai pronto para interface.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="overflow-hidden rounded-2xl border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Função</TableHead>
                        <TableHead>Entrada</TableHead>
                        <TableHead>Saída</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {formatters.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-mono text-xs">
                            {item.name}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {item.input}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-foreground">
                            {item.output}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <CodeBlock>{`import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";

const cpf = useInputMask("", INPUT_MASKS.CPF);

<Input
  value={cpf.value}
  onChange={cpf.onChange}
  placeholder="000.000.000-00"
/>

const payload = {
  cpf: cpf.rawValue,
};`}</CodeBlock>
          </div>
        </div>
      </section>

      <section id="providers" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Camadas globais"
            title="Providers e contexts entram uma vez e trabalham em silêncio."
            description="O AppProvider segura a fundação. A tela só consome hooks e componentes, sem pilha de providers repetida em cada canto."
            align="center"
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-border bg-background p-4 sm:p-6">
              <div className="space-y-3">
                {providers.map((provider, index) => (
                  <div
                    key={provider.name}
                    className="group flex gap-4 rounded-3xl p-3 transition hover:bg-muted/50 sm:p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 font-mono text-sm text-blue-700 dark:text-blue-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <p className="font-semibold text-foreground">
                        {provider.name}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {provider.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {contexts.map((context) => (
                <Card
                  key={context.name}
                  className="border-border/70 bg-card/70 shadow-none"
                >
                  <CardHeader>
                    <CardTitle>{context.name}</CardTitle>
                    <CardDescription>{context.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="rounded-2xl bg-muted/60 p-4 font-mono text-xs leading-7 text-muted-foreground">
                      {context.methods}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-[2.5rem] border border-border bg-card/60 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div>
              <SectionHeader
                eyebrow="Stack"
                title="Bibliotecas principais já no trilho."
                description="A lista evita surpresa para quem baixar o repositório e também vende bem a maturidade da base."
              />

              <Button
                asChild
                className="mt-8 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Link href={githubUrl} target="_blank" rel="noreferrer">
                  Ver perfil no GitHub
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2">
              {stack.map((item) => (
                <div key={item} className="bg-background p-5">
                  <div className="flex items-center gap-3">
                    <Check className="size-4 text-blue-600 dark:text-blue-300" />
                    <p className="font-medium text-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="docs" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] border border-border bg-neutral-950 p-8 text-neutral-100 shadow-2xl shadow-black/25 sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.24),transparent_34%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-neutral-400">
                  <span className="h-px w-8 bg-neutral-700" />
                  Documentação
                </div>

                <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  A home vira manual visual do projeto.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-300">
                  Em vez de uma landing bonita e vazia, ela mostra os arquivos
                  que importam: route groups, layouts, dashboard, auth,
                  componentes, contexts, providers, formatters, hook de máscara,
                  API e database helpers.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [
                    BookOpen,
                    "doc_componentes_ui.md",
                    "uso e exemplos dos 19 componentes",
                  ],
                  [
                    Braces,
                    "doc_contexts.md",
                    "SidebarContext e ToastContext",
                  ],
                  [
                    Layers,
                    "doc_providers.md",
                    "AppProvider e providers globais",
                  ],
                  [
                    Route,
                    "architecture.md",
                    "route groups, layouts e áreas do app",
                  ],
                  [
                    DatabaseZap,
                    "database/README.md",
                    "Supabase opcional e banco local",
                  ],
                  [
                    FileCode2,
                    "doc_input_mask.md",
                    "hook useInputMask",
                  ],
                ].map(([Icon, name, description]) => (
                  <div
                    key={name}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <Icon className="size-5 text-blue-300" />
                    <p className="mt-5 font-mono text-sm text-neutral-100">
                      {name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-border bg-background p-8 text-center sm:p-12 lg:p-16">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
            <Rocket className="size-6" />
          </div>

          <h2 className="mx-auto mt-7 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Clone, renomeie, troque a marca e comece seu próprio projeto.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Esse starter não tenta ser seu produto final. Ele entrega a largada:
            estrutura, UI, tema, contextos, providers, utilitários, route groups,
            auth, dashboard, API e documentação para você construir sem tropeçar
            no setup.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Link href={githubUrl} target="_blank" rel="noreferrer">
                Abrir repositório
                <Computer className="size-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/login">
                <LogIn className="size-4" />
                Ver login
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/register">
                <UserPlus className="size-4" />
                Ver sign-up
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">
                <LayoutDashboard className="size-4" />
                Ver dashboard
              </Link>
            </Button>

            <Button asChild size="lg" variant="ghost">
              <Link href="#inicio">Voltar ao topo</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}