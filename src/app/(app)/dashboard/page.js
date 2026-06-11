import Link from "next/link";
import { Activity, ArrowUpRight, DatabaseZap, Layers, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  { label: "Route groups", value: "3", icon: Route },
  { label: "Providers", value: "4+", icon: Layers },
  { label: "Database", value: "opcional", icon: DatabaseZap },
];

const checklist = [
  { task: "Trocar nome do app", status: "Ajustar", path: "src/config/app.js" },
  { task: "Configurar variáveis de ambiente", status: "Ajustar", path: ".env.example" },
  { task: "Escolher banco de dados", status: "Opcional", path: "src/lib/database" },
  { task: "Ligar autenticação real", status: "Opcional", path: "src/app/(auth)" },
];

export default function DashboardPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="secondary">Área interna</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Dashboard inicial
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Tela de exemplo para mostrar como uma área logada pode nascer no starter. Sem regra de negócio, sem drama, sem gambiarra de estimação.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/api/health" target="_blank">
              Testar API
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.label} className="border-border/70 bg-card/70 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <div>
                    <CardDescription>{item.label}</CardDescription>
                    <CardTitle className="mt-2 text-3xl">{item.value}</CardTitle>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                    <Icon className="size-5" />
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-border/70 bg-card/70 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-5 text-blue-600 dark:text-blue-300" />
                Próximos passos
              </CardTitle>
              <CardDescription>
                Use isso como checklist para adaptar o starter em um projeto real.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
              <p>1. Mova a home para o grupo (public), se ainda estiver em src/app/page.js.</p>
              <p>2. Escolha se o projeto terá auth, dashboard e banco de dados.</p>
              <p>3. Apague exemplos que não fazem sentido para o produto final.</p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/70 shadow-none">
            <CardHeader>
              <CardTitle>Checklist de adaptação</CardTitle>
              <CardDescription>
                Arquivos que normalmente você altera depois de clonar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tarefa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Arquivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checklist.map((item) => (
                      <TableRow key={item.task}>
                        <TableCell>{item.task}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.status}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">{item.path}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
