import { AuthBackButton } from "@/components/layout/auth-back-button";
import { Badge } from "@/components/ui/badge";

export function AuthLayout({ children }) {
  return (
    /*
      Layout exclusivo para autenticação.

      Ele NÃO usa AppShell.
      Por isso login e register não carregam:
      - header público
      - footer público
      - sidebar pública
      - sidebar do dashboard

      A ideia aqui é foco total no formulário.
    */
    <main className="relative isolate overflow-hidden bg-background">
      {/* Fundo decorativo com gradientes suaves. Não interfere no conteúdo. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.20),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_28%)]" />

      {/*
        Grid principal:
        - no desktop divide em duas colunas
        - no mobile mostra apenas a área do formulário
      */}
      <div className="grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
        {/*
          Coluna esquerda.
          Fica escondida no mobile para não roubar espaço do formulário.
        */}
        <section className="hidden border-r border-border/70 bg-card/40 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Badge variant="secondary" className="mb-8">
              Starter auth
            </Badge>

            <h1 className="max-w-xl text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground">
              Autenticação limpa, sem carregar a parte pública do projeto.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">
              Use esse layout para login, cadastro, recuperar senha e fluxos que
              precisam de foco total no formulário.
            </p>
          </div>
          
        </section>

        {/* Coluna direita. Aqui entram login, register e outras páginas auth. */}
        <section className="flex flex-col">
          {/* Topo simples do auth, com botão de voltar e marcador da área. */}
          <div className="flex items-center justify-between p-4 sm:p-6">
            <AuthBackButton />

            <Badge variant="outline">Auth</Badge>
          </div>

          {/*
            Área central do formulário.
            children será o conteúdo de:
            - src/app/(auth)/login/page.js
            - src/app/(auth)/register/page.js
          */}
          <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}