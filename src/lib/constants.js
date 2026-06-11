// Constantes globais do projeto.
// Esse arquivo é um exemplo de lugar para centralizar valores fixos
// usados em várias partes da aplicação.

export const APP_CONFIG = {
  name: "Next.js Brazilian Starter",
  description:
    "Starter brasileiro em Next.js com estrutura, providers, contexts e componentes prontos.",
  author: "Maria Eduarda",
  locale: "pt-BR",
  country: "BR",
  currency: "BRL",
};

// Rotas principais da aplicação.
// Útil para evitar strings soltas espalhadas pelo projeto.
export const APP_ROUTES = {
  home: "/",
  docs: "/docs",
  dashboard: "/dashboard",
  settings: "/settings",
};

// Chaves usadas pelo React Query.
// Ajuda a padronizar cache e invalidação de queries.
export const QUERY_KEYS = {
  users: ["users"],
  profile: ["profile"],
  settings: ["settings"],
};

// Opções comuns para selects brasileiros.
export const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

// Status genéricos para exemplos de sistemas.
export const STATUS_OPTIONS = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
  { value: "pending", label: "Pendente" },
  { value: "blocked", label: "Bloqueado" },
];

// Opções comuns de paginação para tabelas.
export const PAGE_SIZE_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
  { value: "100", label: "100 por página" },
];

// Mensagens padrão usadas em feedbacks e estados vazios.
export const DEFAULT_MESSAGES = {
  loading: "Carregando...",
  saving: "Salvando...",
  success: "Operação realizada com sucesso.",
  error: "Não foi possível concluir a operação.",
  empty: "Nenhum registro encontrado.",
};