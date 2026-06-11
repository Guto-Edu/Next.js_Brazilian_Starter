import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthBackButton() {
  return (
    /*
      Botão pequeno usado no layout de autenticação.

      Ele fica separado em componente próprio porque pode ser reutilizado em:
      - login
      - registro
      - recuperar senha
      - redefinir senha
    */
    <Button asChild variant="ghost" size="sm">
      <Link href="/">
        <ArrowLeft className="size-4" />
        Voltar para o início
      </Link>
    </Button>
  );
}