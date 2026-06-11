import { AppProvider } from "@/providers/app-provider";
import "./globals.css";

// Metadata global do projeto.
// Pode ser sobrescrita depois em páginas/layouts específicos.
export const metadata = {
  title: "Next.js Brazilian Starter",
  description:
    "Starter Next.js com UI, providers, contexts, formatters, máscaras e estrutura pronta.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {/*
          AppProvider fica no layout raiz porque ele carrega providers globais,
          como tema, toast, query client e contextos gerais.

          Importante:
          NÃO coloque AppShell, Header, Footer ou Sidebar aqui.
          Se colocar, login, register e dashboard vão herdar tudo também.
        */}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}