import Link from "next/link";
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/*
  Links principais da sidebar.

  Deixei alguns hrefs que ainda podem não existir.
  Isso é normal em starter, porque já mostra o caminho de expansão:
  /dashboard/reports
  /dashboard/documents
  /dashboard/profile
  /dashboard/settings
*/
const dashboardLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Relatórios",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    label: "Documentos",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar({ onNavigate }) {
  return (
    /*
      Sidebar do dashboard.

      Ela é usada em dois lugares:
      - fixa no desktop
      - dentro do menu mobile

      onNavigate é opcional.
      No mobile, usamos para fechar a sidebar depois que o usuário clica em um link.
    */
    <aside className="flex h-full flex-col border-r border-border bg-background">
      {/* Cabeçalho da sidebar com marca/nome do painel. */}
      <div className="border-b border-border p-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-600 text-white dark:bg-blue-500">
            <LayoutDashboard className="size-5" />
          </div>

          <div>
            <p className="font-semibold tracking-tight text-foreground">
              Starter App
            </p>
            <p className="text-xs text-muted-foreground">
              Dashboard template
            </p>
          </div>
        </Link>
      </div>

      {/* Navegação principal. */}
      <nav className="flex-1 space-y-1 p-3">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4 transition group-hover:text-blue-600 dark:group-hover:text-blue-300" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé da sidebar com atalho para voltar ao site público. */}
      <div className="border-t border-border p-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <Home className="size-4" />
            Voltar ao site
          </span>

          <Badge variant="secondary">public</Badge>
        </Link>
      </div>
    </aside>
  );
}