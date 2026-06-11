"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardFooter } from "@/components/layout/dashboard-footer";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export function DashboardShell({ children }) {
  /*
    Estado usado apenas para abrir/fechar a sidebar no mobile.

    No desktop, a sidebar fica fixa.
    No mobile, ela vira um painel sobreposto.
  */
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  function openMobileSidebar() {
    setIsMobileSidebarOpen(true);
  }

  function closeMobileSidebar() {
    setIsMobileSidebarOpen(false);
  }

  return (
    /*
      Shell principal do dashboard.

      Ele controla:
      - sidebar fixa no desktop
      - sidebar sobreposta no mobile
      - header interno
      - área principal
      - footer interno
    */
    <div className="min-h-svh bg-muted/30">
      {/*
        Sidebar desktop.

        Fica fixa à esquerda.
        hidden em telas menores que lg.
      */}
      <div className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <DashboardSidebar />
      </div>

      {/*
        Sidebar mobile.

        Só aparece quando isMobileSidebarOpen for true.
        Tem overlay escuro para fechar clicando fora.
      */}
      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay para fechar o menu ao clicar fora. */}
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/45"
            onClick={closeMobileSidebar}
          />

          {/* Painel lateral mobile. */}
          <div className="relative flex h-full w-80 max-w-[85vw] flex-col bg-background shadow-2xl">
            <div className="flex items-center justify-end border-b border-border p-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeMobileSidebar}
                aria-label="Fechar menu"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/*
              Quando o usuário navegar por um link no mobile,
              a sidebar fecha automaticamente.
            */}
            <DashboardSidebar onNavigate={closeMobileSidebar} />
          </div>
        </div>
      ) : null}

      {/*
        Conteúdo principal.

        No desktop recebe padding-left para não ficar embaixo da sidebar.
        A sidebar tem 18rem, que é w-72.
      */}
      <div className="flex min-h-svh flex-col lg:pl-72">
        <DashboardHeader onMenuClick={openMobileSidebar} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}