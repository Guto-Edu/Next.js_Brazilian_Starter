import Link from "next/link";
import { ArrowUpRight, Computer, MapPin } from "lucide-react";

const githubUrl = "https://github.com/Guto-Edu";

const footerLinks = [
  { label: "Visão geral", href: "#overview" },
  { label: "Componentes", href: "#componentes" },
  { label: "Formatters", href: "#formatters" },
  { label: "Providers", href: "#providers" },
  { label: "Docs", href: "#docs" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-blue-600 text-white dark:bg-blue-500">
              <Computer className="size-5" />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight text-foreground">
                Next Brazilian Starter
              </span>
              <span className="block text-sm text-muted-foreground">
                base pública para projetos Next.js
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            Um starter com UI, providers, contexts, formatters e documentação para acelerar projetos para uma base de projeto forte.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Página</p>
          <div className="mt-4 grid gap-3">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Projeto</p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <Link
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-foreground"
            >
              GitHub
              <ArrowUpRight className="size-3.5" />
            </Link>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5" />
              São João del-Rei, MG
            </span>
            <span>Open source starter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
