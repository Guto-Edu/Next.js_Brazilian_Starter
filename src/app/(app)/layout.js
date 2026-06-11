import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AppGroupLayout({ children }) {
  return (
    /*
      Tudo dentro de src/app/(app) usa o DashboardShell.

      Exemplo:
      src/app/(app)/dashboard/page.js          -> /dashboard
      src/app/(app)/dashboard/reports/page.js  -> /dashboard/reports
      src/app/(app)/dashboard/settings/page.js -> /dashboard/settings

      O nome (app) não aparece na URL.
    */
    <DashboardShell>{children}</DashboardShell>
  );
}