// Funções utilitárias genéricas.
// São exemplos úteis para qualquer projeto Next.js.
// Evite jogar regra de negócio aqui. Utils deve ser ferramenta, não depósito.

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Função padrão usada pelo shadcn para mesclar classes CSS.
// Ela combina clsx com tailwind-merge para evitar conflitos de classes.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Aguarda uma quantidade de milissegundos.
// Útil para testes, loading fake e exemplos de promise.
export function sleep(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Verifica se o código está rodando no navegador.
// Útil para evitar erro ao acessar window durante renderização no servidor.
export function isBrowser() {
  return typeof window !== "undefined";
}

// Cria um ID simples.
// Não substitui UUID para banco de dados, mas ajuda em exemplos e componentes.
export function createId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

// Capitaliza a primeira letra de uma string.
export function capitalize(value = "") {
  const text = String(value).trim();

  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Trunca texto grande e adiciona reticências.
export function truncate(value = "", max = 80) {
  const text = String(value);

  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, max)}...`;
}

// Remove valores vazios de um objeto.
// Útil antes de montar query params ou enviar filtros para APIs.
export function removeEmptyValues(object = {}) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === "string" && value.trim() === "") {
        return false;
      }

      if (Array.isArray(value) && value.length === 0) {
        return false;
      }

      return true;
    })
  );
}

// Converte objeto para query string.
// Exemplo: { page: 1, search: "teste" } vira "?page=1&search=teste".
export function objectToQueryString(params = {}) {
  const cleanParams = removeEmptyValues(params);
  const query = new URLSearchParams(cleanParams).toString();

  return query ? `?${query}` : "";
}

// Converte query string para objeto simples.
// Útil quando você quer ler filtros da URL.
export function queryStringToObject(searchParams) {
  if (!searchParams) {
    return {};
  }

  return Object.fromEntries(new URLSearchParams(searchParams));
}

// Ordena array de objetos por uma chave.
// Mantém simples para uso em exemplos, tabelas e selects.
export function sortByKey(array = [], key = "", direction = "asc") {
  return [...array].sort((firstItem, secondItem) => {
    const firstValue = firstItem?.[key];
    const secondValue = secondItem?.[key];

    if (firstValue < secondValue) {
      return direction === "asc" ? -1 : 1;
    }

    if (firstValue > secondValue) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}

// Agrupa itens de um array por uma chave.
// Exemplo: agrupar pedidos por status.
export function groupBy(array = [], key = "") {
  return array.reduce((acc, item) => {
    const groupKey = item?.[key] ?? "undefined";

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(item);

    return acc;
  }, {});
}

// Formata erro desconhecido para mensagem amigável.
// Ajuda quando o catch recebe qualquer coisa.
export function getErrorMessage(error, fallback = "Algo deu errado.") {
  if (typeof error === "string") {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
}