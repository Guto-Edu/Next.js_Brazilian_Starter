# Providers

A pasta `providers` concentra os componentes globais que precisam envolver a aplicação.

Eles são usados no `layout.js` através do `AppProvider`, deixando a estrutura principal mais limpa e evitando configurações espalhadas pelo projeto.

## Estrutura

```txt
src/
  providers/
    app-provider.jsx
    query-provider.jsx
    theme-provider.jsx
    toast-provider.jsx
```

## AppProvider

O `AppProvider` é o provider principal da aplicação.

Ele centraliza todos os outros providers globais em um único lugar.

Atualmente ele envolve a aplicação com:

* `ThemeProvider`
* `QueryProvider`
* `ToastContextProvider`
* `SidebarContextProvider`
* `ToastProvider`

Isso evita que o arquivo `layout.js` fique cheio de providers aninhados.

Exemplo de uso:

```jsx
import { AppProvider } from "@/providers/app-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
```

## QueryProvider

O `QueryProvider` configura o TanStack Query na aplicação.

Ele é responsável por gerenciar cache, requisições, loading, erros e atualização de dados vindos de APIs ou banco de dados.

Configurações aplicadas:

```js
staleTime: 1000 * 60 * 5
gcTime: 1000 * 60 * 30
refetchOnWindowFocus: false
retry: 1
```

Na prática:

* os dados ficam frescos por 5 minutos;
* o cache é mantido por 30 minutos;
* a página não refaz requisição automaticamente ao voltar para a aba;
* queries tentam novamente uma vez em caso de erro;
* mutations não fazem retry automático.

Em ambiente de desenvolvimento, o projeto também exibe o React Query Devtools.

## ThemeProvider

O `ThemeProvider` usa a biblioteca `next-themes`.

Ele permite trabalhar com tema claro, escuro ou automático de acordo com o sistema do usuário.

Configuração atual:

```jsx
<NextThemesProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</NextThemesProvider>
```

Com isso, o tema é aplicado através de classes no HTML.

Exemplo:

```jsx
<html class="dark">
```

Isso facilita o uso com Tailwind CSS e componentes que dependem de modo claro ou escuro.

## ToastProvider

O `ToastProvider` renderiza o componente visual responsável pelas notificações do sistema.

A biblioteca usada é o `sonner`.

Configuração atual:

```jsx
<Toaster
  position="top-right"
  richColors
  closeButton
  expand
  toastOptions={{
    duration: 4000,
  }}
/>
```

As notificações aparecem no canto superior direito, com cores por tipo, botão de fechar e duração padrão de 4 segundos.

Exemplo de uso direto:

```jsx
import { toast } from "sonner";

toast.success("Salvo com sucesso!");
toast.error("Erro ao salvar.");
```

## Ordem dos providers

A ordem atual é:

```jsx
<ThemeProvider>
  <QueryProvider>
    <ToastContextProvider>
      <SidebarContextProvider>
        {children}
        <ToastProvider />
      </SidebarContextProvider>
    </ToastContextProvider>
  </QueryProvider>
</ThemeProvider>
```

Essa ordem mantém o tema disponível para toda a aplicação, o cache de requisições ativo globalmente e os contextos acessíveis dentro das telas e componentes.

## Quando criar um novo provider

Crie um novo provider apenas quando alguma configuração ou estado precisar estar disponível em várias partes da aplicação.

Bons exemplos:

* autenticação;
* tema;
* notificações;
* sidebar;
* configurações globais;
* permissões do usuário.

Evite criar provider para estados pequenos ou muito específicos de uma tela. Nesses casos, prefira `useState`, `useReducer` ou um hook local.

## Resumo

Os providers existem para organizar configurações globais do projeto.

O objetivo é manter o `layout.js` simples, facilitar manutenção e deixar a base pronta para crescer sem bagunçar a estrutura.
