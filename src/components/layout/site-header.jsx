"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Computer, Menu, Moon, Sun, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/sidebar-context";

const githubUrl = "https://github.com/Guto-Edu";

const navItems = [
  { label: "Visão geral", href: "#overview" },
  { label: "UI", href: "#componentes" },
  { label: "Formatters", href: "#formatters" },
  { label: "Providers", href: "#providers" },
  { label: "Docs", href: "#docs" },
];

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer setting mounted to avoid calling setState synchronously within the effect,
    // which can trigger cascading renders.
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  function handleToggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="size-4" />
          </Button>

          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-500">
              <TerminalSquare className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                Next Brazilian Starter
              </span>
              <span className="hidden truncate text-xs text-muted-foreground sm:block">
                base pública para projetos Next.js
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur-xl lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href={githubUrl} target="_blank" rel="noreferrer">
              <Computer className="size-4" />
              GitHub
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={handleToggleTheme}
            aria-label="Alternar tema"
            className="bg-card/70"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
