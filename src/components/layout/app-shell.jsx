import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_28%)]" />

        <div className="absolute inset-0 text-border opacity-[0.28] dark:opacity-[0.16] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/90 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}