import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <main className="grid min-h-[calc(100svh-5rem)] place-items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
            <UserPlus className="size-6" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
            Criar conta
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Uma tela de cadastro limpa para você ligar ao seu provedor de autenticação depois.
          </p>
        </div>

        <Card className="border-border/70 bg-card/70 shadow-none">
          <CardHeader>
            <CardTitle>Novo acesso</CardTitle>
            <CardDescription>
              Comece simples. Depois conecte validação com Zod e envio para sua API.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" autoComplete="name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Mínimo de 8 caracteres" autoComplete="new-password" />
            </div>
          </CardContent>

          <CardFooter className="grid gap-3">
            <Button className="w-full">
              Criar conta
              <ArrowRight className="size-4" />
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
