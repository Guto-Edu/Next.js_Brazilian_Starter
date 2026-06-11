export function DashboardFooter() {
  return (
    /*
      Footer do dashboard.

      Ele é separado do footer público porque painel interno costuma ter
      informações diferentes, como versão, ambiente, usuário, suporte etc.
    */
    <footer className="border-t border-border px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Next.js Brazilian Starter</p>
        <p>Dashboard layout pronto para adaptar.</p>
      </div>
    </footer>
  );
}