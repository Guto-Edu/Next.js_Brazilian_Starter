import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader({ onMenuClick }) {
  return (
    /*
      Header exclusivo do dashboard.

      Ele não é o mesmo header do site público.
      Aqui você pode colocar:
      - busca interna
      - botão de menu mobile
      - notificações
      - usuário logado
      - ações rápidas
    */
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/*
          Botão do menu mobile.
          No desktop fica escondido porque a sidebar já fica fixa.
        */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <Menu className="size-4" />
        </Button>

        {/* Título simples do painel. */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">
            Painel administrativo
          </p>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Estrutura interna com header, sidebar e footer próprios.
          </p>
        </div>

        {/* Busca visual. Pode ser conectada a estado, filtro ou command menu depois. */}
        <div className="hidden w-full max-w-xs items-center gap-2 rounded-2xl border border-border bg-muted/40 px-3 md:flex">
          <Search className="size-4 text-muted-foreground" />

          <Input
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            placeholder="Buscar..."
          />
        </div>

        <Badge variant="outline">Dashboard</Badge>
      </div>
    </header>
  );
}