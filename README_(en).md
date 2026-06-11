# Next.js Brazilian Starter

A public starter for creating **Next.js** projects with an already organized foundation: App Router, route groups, area-based layouts, reusable UI, global providers, contexts, theme handling, input masks, Brazilian formatters, API routes, and an initial database structure.

The goal is simple: reduce the time wasted on the initial setup and provide a base that developers can clone, understand, and adapt into a real product.

## What this project provides

- Structure with `src/app` using **App Router**.
- Route groups separated into `(public)`, `(auth)`, and `(app)`.
- Independent layouts for the public area, authentication, and dashboard.
- Global providers for theme, React Query, and notifications.
- Contexts for toast and sidebar.
- UI components based on `shadcn/ui`, Radix/Base UI, and Tailwind.
- Input mask hook for common Brazilian data.
- Formatters for CPF, CNPJ, phone number, ZIP code, currency, dates, percentage, vehicle plate, and slug.
- Structure prepared for Supabase or a local database.
- Initial API routes for health check and help.
- A public page working as a technical showcase for the starter.

## Main stack

| Technology | Project usage |
|---|---|
| Next.js 16 | Main framework with App Router |
| React 19 | UI and component composition |
| Tailwind CSS 4 | Styling |
| shadcn/ui | Base for interface components |
| Radix UI / Base UI | Accessible UI primitives |
| TanStack Query | Cache, server state, and requests |
| React Hook Form | Forms |
| Zod | Data validation |
| Sonner | Toast notifications |
| next-themes | Light, dark, and system themes |
| Lucide React | Icons |
| date-fns | Date handling |
| Recharts | Charts |
| ExcelJS / XLSX | Spreadsheet export and reading |

## Folder structure

```txt
src/
  app/
    layout.js
    globals.css

    (public)/
      layout.js
      page.js

    (auth)/
      layout.js
      login/
      register/

    (app)/
      layout.js
      dashboard/

    api/
      README.md
      health/
      help/

  components/
    layout/
      app-shell.jsx
      auth-layout.jsx
      dashboard-shell.jsx
      dashboard-header.jsx
      dashboard-sidebar.jsx
      dashboard-footer.jsx
      site-header.jsx
      site-footer.jsx
    ui/
      ...

  context/
    sidebar-context.jsx
    toast-context.jsx

  hooks/
    use-input-mask.js

  lib/
    database/
      local/
      supabase/
    constants.js
    formatters.js
    utils.js
    validations.js

  providers/
    app-provider.jsx
    query-provider.jsx
    theme-provider.jsx
    toast-provider.jsx

proxy.js
```

## Route groups

The project uses route groups to separate responsibilities without changing the final URL.

| Group | Purpose | Route examples |
|---|---|---|
| `(public)` | Public area of the project | `/` |
| `(auth)` | Authentication screens | `/login`, `/register` |
| `(app)` | Internal application area | `/dashboard` |
| `api` | App Router route handlers | `/api/health`, `/api/help` |

Example:

```txt
src/app/(public)/page.js        -> /
src/app/(auth)/login/page.js    -> /login
src/app/(app)/dashboard/page.js -> /dashboard
```

Folders wrapped in parentheses organize the code, but they are not included in the URL path.

## Layouts

Each area has its own layout.

| File | Responsibility |
|---|---|
| `src/app/layout.js` | Root layout. Loads HTML, body, global CSS, and providers. |
| `src/app/(public)/layout.js` | Public area layout with `AppShell`, site header, and site footer. |
| `src/app/(auth)/layout.js` | Clean layout for login and registration. |
| `src/app/(app)/layout.js` | Internal layout with dashboard shell, sidebar, header, and footer. |

The idea is to avoid a heavy root layout. Header, footer, and sidebar should not live in the root layout because not every area needs the same visual structure.

## Providers

Global providers are centralized in `src/providers`.

| Provider | Responsibility |
|---|---|
| `AppProvider` | Composes the project's global providers. |
| `ThemeProvider` | Light, dark, and system themes using `next-themes`. |
| `QueryProvider` | TanStack Query configuration and Devtools in development. |
| `ToastProvider` | Global Sonner rendering. |

Expected usage in the root layout:

```jsx
// src/app/layout.js
import { AppProvider } from "@/providers/app-provider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
```

## Contexts

Contexts are located in `src/context`.

### SidebarContext

Global control for opening and closing the sidebar.

Main returned values:

```txt
isSidebarOpen
openSidebar
closeSidebar
toggleSidebar
```

Suggested usage:

```jsx
import { useSidebar } from "@/context/sidebar-context";

export function SidebarButton() {
  const { toggleSidebar } = useSidebar();

  return <button onClick={toggleSidebar}>Menu</button>;
}
```

### ToastContext

Creates a custom API for notifications, avoiding the need to import `sonner` in every screen.

Main methods:

```txt
showSuccess
showError
showInfo
showWarning
showLoading
showPromise
clearToasts
```

Suggested usage:

```jsx
import { useToast } from "@/context/toast-context";

export function SaveButton() {
  const toast = useToast();

  function handleSave() {
    toast.showSuccess("Record saved successfully.");
  }

  return <button onClick={handleSave}>Save</button>;
}
```

## UI components

The starter already includes a base set of components for building common system screens, dashboards, landing pages, and admin areas.

Available components:

| Component | Common usage |
|---|---|
| `AlertDialog` | Confirmation for sensitive actions. |
| `Badge` | Status, category, or short marker. |
| `Button` | Primary, secondary, and icon actions. |
| `Card` | Content grouping. |
| `Checkbox` | Boolean selection. |
| `Dialog` | Modal for short forms or details. |
| `Drawer` | Side or bottom panel for filters and quick editing. |
| `DropdownMenu` | Contextual action menu. |
| `Input` | Text field. |
| `InputGroup` | Field with prefix, suffix, button, or icon. |
| `Label` | Accessible form label. |
| `MultiSelect` | Multiple selection with search. |
| `Pagination` | Page navigation. |
| `SearchableSelect` | Single selection with search. |
| `Select` | Simple single selection. |
| `Switch` | On/off toggle. |
| `Table` | Tabular lists. |
| `Textarea` | Long text. |
| `Tooltip` | Short help text for compact elements. |

Example:

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New module</CardTitle>
      </CardHeader>

      <CardContent>
        <Button>Start</Button>
      </CardContent>
    </Card>
  );
}
```

## Input masks

The `useInputMask` hook centralizes masks for Brazilian forms.

Available masks:

```txt
CPF
CNPJ
CPF_CNPJ
PHONE
CEP
DATE
MONTH_YEAR
TIME
DATE_TIME
CURRENCY
PERCENT
PLATE
NUMBER
```

Example:

```jsx
import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";
import { Input } from "@/components/ui/input";

export function CPFInput() {
  const cpf = useInputMask("", INPUT_MASKS.CPF);

  return (
    <Input
      value={cpf.value}
      onChange={cpf.onChange}
      placeholder="000.000.000-00"
    />
  );
}
```

To send data to the backend, use the clean value:

```js
const payload = {
  cpf: cpf.rawValue,
};
```

## Brazilian formatters

The `src/lib` folder includes formatters for displaying data in the Brazilian standard.

Examples:

| Function | Input | Output |
|---|---:|---|
| `formatCPF` | `12345678900` | `123.456.789-00` |
| `formatCNPJ` | `12345678000199` | `12.345.678/0001-99` |
| `formatPhoneBR` | `32999990000` | `(32) 99999-0000` |
| `formatCEP` | `36300000` | `36300-000` |
| `formatCurrencyBR` | `123456` | `R$ 1.234,56` |
| `formatDateBR` | `11062026` | `11/06/2026` |
| `formatDateTimeBR` | `110620261430` | `11/06/2026 14:30` |
| `formatVehiclePlate` | `ABC1234` | `ABC-1234` |
| `formatSlug` | `São João del Rei!` | `sao-joao-del-rei` |

## Database

The project does not force a database choice. It provides a structure that can be adapted.

```txt
src/lib/database/
  README.md

  supabase/
    README.md
    client.js.example
    server.js.example

  local/
    README.md
    client.js.example
```

### Supabase

Use the `supabase` folder when the project needs managed Postgres, authentication, storage, realtime, or policies.

Recommended flow:

1. Copy the `.example` files.
2. Rename them to the real project files.
3. Configure the variables in `.env.local`.
4. Create domain-specific helpers in separate folders.

### Local database

Use the `local` folder if you want to adapt the starter for Prisma, Drizzle, SQLite, local Postgres, or another solution.

## API routes

Initial routes available:

| Route | Usage |
|---|---|
| `/api/health` | Check whether the app is online. |
| `/api/help` | Return basic support or documentation information. |

Route handler example:

```js
export async function GET() {
  return Response.json({
    status: "ok",
    app: "nextjs-brazilian-starter",
    timestamp: new Date().toISOString(),
  });
}
```

Use `src/app/api` for webhooks, external integrations, server-side validations, and internal endpoints.

For larger rules, avoid placing everything inside `route.js`. Create services or domain modules, for example:

```txt
src/services/
  customers/
  products/
  billing/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Guto-Edu/nextjs-brazilian-starter.git
cd nextjs-brazilian-starter
```

Install dependencies:

```bash
npm install
```

Or, if you prefer pnpm:

```bash
pnpm install
```

Create the environment file:

```bash
cp .env.example .env.local
```

Run the project:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server. |
| `npm run build` | Generates the production build. |
| `npm run start` | Starts the app in production mode. |
| `npm run lint` | Runs ESLint. |

## Environment variables

The project includes `.env.example`. Adjust it according to the stack you choose.

Common example for Supabase projects:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Next.js Brazilian Starter"

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

DATABASE_URL=
```

Not every variable is required to run the initial base. Configure only what your project actually uses.

## Adopted conventions

- Global components live in `src/components`.
- Layout components live in `src/components/layout`.
- Reusable interface components live in `src/components/ui`.
- Providers live in `src/providers`.
- Contexts live in `src/context`.
- Hooks live in `src/hooks`.
- Helpers, validations, formatters, and utilities live in `src/lib`.
- Route handlers live in `src/app/api`.
- App areas are separated by route groups.

## How to adapt this into a real product

1. Rename the project in `package.json`.
2. Update metadata, favicon, and public copy.
3. Change colors, typography, and global CSS tokens.
4. Define which database will be used.
5. Configure authentication.
6. Create product domains, such as customers, products, orders, or finance.
7. Remove examples that will not be used.
8. Keep only one package manager and one lockfile.

About the last point: the project can be run with npm or pnpm, but the ideal approach is to choose one standard to avoid divergence between `package-lock.json` and `pnpm-lock.yaml`.

## Recommended for

- Admin systems.
- Dashboards.
- SaaS products.
- Internal portals.
- MVPs with login, panel, and CRUDs.
- Projects that need a ready-to-evolve interface.
- Developers who want to start beyond the basic setup.

## May be too much for

- Very simple landing pages.
- Small institutional websites.
- Projects that do not need a dashboard, providers, table, form, or internal routes.

In those cases, a smaller base may be more appropriate.

## Starter public page

The project home page presents the main features of the base:

- route groups;
- layouts;
- folder structure;
- database helpers;
- API routes;
- component inventory;
- UI playground;
- formatters;
- input masks;
- providers;
- contexts;
- main stack.

This page works as visual documentation for anyone accessing the project for the first time.

## Development

During development, a few recommendations help keep the project clean:

- Do not place business rules inside UI components.
- Do not duplicate formatters inside pages.
- Do not import `sonner` in several places if `ToastContext` already solves it.
- Do not turn the root layout into the site's visual layout.
- Do not mix public screens, auth screens, and dashboard inside the same group.
- Do not leave overly specific helpers inside `utils.js`; as the project grows, create domain-based files.

## Possible next steps

Good ideas for evolving the starter:

- full authentication flow;
- session middleware;
- CRUD example;
- table example with filters;
- form example with React Hook Form and Zod;
- tests;
- documentation in `/docs`;
- theme with custom tokens;
- deployment example;
- Supabase integration example.

## Contribution

Contributions are welcome.

Before opening a pull request:

1. Run lint.
2. Check that the change does not break the base structure.
3. Keep the folder pattern.
4. Document new components, hooks, or providers.
5. Avoid adding dependencies without a clear need.

## License

Define the project license before publishing it for broad usage.

Suggestion: `MIT`, if the intention is to allow free use with low restriction.

## Author

Developed by a Brazilian dev to speed up the beginning of Next.js projects without turning the first workday into repetitive setup.

GitHub: [Guto-Edu](https://github.com/Guto-Edu)
