import { AppShell } from "@/components/layout/app-shell";

export default function PublicLayout({ children }) {
  return (
    /*
      O grupo (public) usa o AppShell do site.

      Aqui entram:
      - header público
      - footer público
      - sidebar pública, se existir
      - estrutura visual da landing

      Rotas dentro de (public) continuam normais na URL.
      Exemplo:
      src/app/(public)/page.js vira /
      src/app/(public)/examples/page.js vira /examples
    */
    <AppShell>{children}</AppShell>
  );
}