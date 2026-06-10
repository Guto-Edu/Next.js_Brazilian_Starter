# Context

A pasta `context` guarda estados e funções que precisam ser acessados em várias partes da aplicação.

A ideia é evitar passar props de componente em componente quando uma informação precisa ser usada de forma global.

## Estrutura

```txt
src/
  contexts/
    sidebar-context.jsx
    toast-context.jsx
```

## Sidebar Context

O `sidebar-context.jsx` controla o estado da sidebar da aplicação.

Ele guarda se a sidebar está aberta ou fechada e expõe funções para alterar esse estado.

### O que ele fornece

```js
isSidebarOpen
openSidebar()
closeSidebar()
toggleSidebar()
```

### Quando usar

Use esse context em componentes que precisam abrir, fechar ou verificar o estado da sidebar.

Exemplos:

* botão de menu no header;
* sidebar mobile;
* botão de fechar menu;
* layout administrativo com navegação lateral.

### Exemplo de uso

```jsx
"use client";

import { useSidebar } from "@/context/sidebar-context";

export function MenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <button type="button" onClick={toggleSidebar}>
      Abrir menu
    </button>
  );
}
```

Exemplo dentro da sidebar:

```jsx
"use client";

import { useSidebar } from "@/context/sidebar-context";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <aside>
      <button type="button" onClick={closeSidebar}>
        Fechar
      </button>

      <nav>
        Menu lateral
      </nav>
    </aside>
  );
}
```

## Toast Context

O `toast-context.jsx` cria uma camada própria para disparar notificações usando o `sonner`.

Ele não renderiza o toast na tela. Quem faz isso é o `ToastProvider`, dentro da pasta `providers`.

Esse context serve para padronizar a forma como as notificações são chamadas no projeto.

### O que ele fornece

```js
showSuccess()
showError()
showInfo()
showWarning()
showLoading()
showPromise()
dismissToast()
dismissAllToasts()
```

### Quando usar

Use esse context quando quiser chamar notificações sem importar diretamente o `toast` do `sonner` no componente.

Exemplo:

```jsx
"use client";

import { useToast } from "@/context/toast-context";

export function SaveButton() {
  const { showSuccess, showError } = useToast();

  function handleSave() {
    try {
      showSuccess("Salvo com sucesso!");
    } catch {
      showError("Erro ao salvar.");
    }
  }

  return (
    <button type="button" onClick={handleSave}>
      Salvar
    </button>
  );
}
```

### Exemplo com promise

```jsx
"use client";

import { useToast } from "@/context/toast-context";

export function SubmitButton() {
  const { showPromise } = useToast();

  function handleSubmit() {
    const request = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    showPromise(request, {
      loading: "Salvando...",
      success: "Salvo com sucesso!",
      error: "Erro ao salvar.",
    });
  }

  return (
    <button type="button" onClick={handleSubmit}>
      Enviar
    </button>
  );
}
```

## Como os contexts entram na aplicação

Os contexts são registrados dentro do `AppProvider`.

Exemplo:

```jsx
<ToastContextProvider>
  <SidebarContextProvider>
    {children}
  </SidebarContextProvider>
</ToastContextProvider>
```

Na prática, isso permite usar `useToast()` e `useSidebar()` em qualquer componente client dentro da aplicação.

## Provider não é hook

Os providers ficam na raiz da aplicação.

Os hooks são usados dentro dos componentes.

Certo:

```jsx
const { toggleSidebar } = useSidebar();
```

```jsx
const { showSuccess } = useToast();
```

Errado:

```jsx
<SidebarContextProvider>
  <MeuBotao />
</SidebarContextProvider>
```

Não é necessário envolver componentes individuais com o provider. Isso já é feito uma vez no `AppProvider`.

## Quando criar um novo context

Crie um context quando um estado ou conjunto de funções precisar ser usado em várias partes do projeto.

Bons exemplos:

* sidebar;
* autenticação;
* usuário logado;
* permissões;
* filtros globais;
* carrinho;
* configurações do sistema.

Evite criar context para estados usados em uma única tela. Nesses casos, `useState`, `useReducer` ou um hook local resolvem melhor.

## Resumo

* `SidebarContext` controla abertura e fechamento da sidebar.
* `ToastContext` padroniza chamadas de notificação.
* Os providers ficam registrados uma vez no `AppProvider`.
* Os componentes usam apenas os hooks: `useSidebar()` e `useToast()`.
* Context é útil, mas deve ser usado com cuidado para não deixar o projeto mais complexo do que precisa.
