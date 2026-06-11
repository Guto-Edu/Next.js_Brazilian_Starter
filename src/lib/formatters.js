// Utilitários de formatação no padrão brasileiro.
// Esse arquivo concentra funções puras, ou seja, funções que recebem um valor
// e retornam outro valor formatado, sem alterar estado externo.

// Remove tudo que não for número.
// Útil para CPF, CNPJ, CEP, telefone, dinheiro e datas.
export function onlyNumbers(value = "") {
  return String(value).replace(/\D/g, "");
}

// Remove tudo que não for letra.
// Pode ser útil para iniciais, nomes e códigos textuais.
export function onlyLetters(value = "") {
  return String(value).replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

// Limita uma string a uma quantidade máxima de caracteres.
export function limitChars(value = "", max = 0) {
  return String(value).slice(0, max);
}

// Formata CPF no padrão 000.000.000-00.
export function formatCPF(value = "") {
  const numbers = onlyNumbers(value).slice(0, 11);

  return numbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

// Formata CNPJ no padrão 00.000.000/0000-00.
export function formatCNPJ(value = "") {
  const numbers = onlyNumbers(value).slice(0, 14);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

// Formata CPF ou CNPJ automaticamente de acordo com a quantidade de dígitos.
export function formatCPForCNPJ(value = "") {
  const numbers = onlyNumbers(value);

  if (numbers.length <= 11) {
    return formatCPF(numbers);
  }

  return formatCNPJ(numbers);
}

// Formata CEP no padrão 00000-000.
export function formatCEP(value = "") {
  const numbers = onlyNumbers(value).slice(0, 8);

  return numbers.replace(/^(\d{5})(\d)/, "$1-$2");
}

// Formata telefone brasileiro.
// Até 10 dígitos: (00) 0000-0000.
// Com 11 dígitos: (00) 00000-0000.
export function formatPhoneBR(value = "") {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// Formata data no padrão brasileiro DD/MM/AAAA.
// Essa função apenas aplica a máscara visual, não valida se a data existe.
export function formatDateBR(value = "") {
  const numbers = onlyNumbers(value).slice(0, 8);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

// Formata mês e ano no padrão MM/AAAA.
export function formatMonthYearBR(value = "") {
  const numbers = onlyNumbers(value).slice(0, 6);

  return numbers.replace(/^(\d{2})(\d)/, "$1/$2");
}

// Formata hora no padrão HH:mm.
export function formatTimeBR(value = "") {
  const numbers = onlyNumbers(value).slice(0, 4);

  return numbers.replace(/^(\d{2})(\d)/, "$1:$2");
}

// Formata data e hora no padrão DD/MM/AAAA HH:mm.
export function formatDateTimeBR(value = "") {
  const numbers = onlyNumbers(value).slice(0, 12);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
    .replace(/^(\d{2})\/(\d{2})\/(\d{4})(\d)/, "$1/$2/$3 $4")
    .replace(/(\d{2})\s(\d{2})(\d)/, "$1 $2:$3");
}

// Formata valor em moeda brasileira.
// Exemplo: 123456 vira R$ 1.234,56.
export function formatCurrencyBR(value = "") {
  const numbers = onlyNumbers(value);

  if (!numbers) {
    return "";
  }

  const amount = Number(numbers) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

// Formata número no padrão brasileiro.
// Exemplo: 1234.5 vira 1.234,5.
export function formatNumberBR(value = 0, options = {}) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", options).format(number);
}

// Formata porcentagem simples.
// Exemplo: 15 vira 15%.
export function formatPercentBR(value = "") {
  const numbers = onlyNumbers(value).slice(0, 3);

  if (!numbers) {
    return "";
  }

  return `${numbers}%`;
}

// Formata placa de veículo.
// Aceita padrão antigo AAA-0000 e Mercosul AAA0A00.
export function formatVehiclePlate(value = "") {
  const cleanValue = String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 7);

  // Se o quinto caractere for letra, trata como Mercosul.
  if (/^[A-Z]{3}\d[A-Z]/.test(cleanValue)) {
    return cleanValue;
  }

  return cleanValue.replace(/^([A-Z]{3})(\d)/, "$1-$2");
}

// Formata texto para slug.
// Exemplo: "Meu Projeto Legal" vira "meu-projeto-legal".
export function formatSlug(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Converte moeda brasileira formatada para número.
// Exemplo: "R$ 1.234,56" vira 1234.56.
export function currencyBRToNumber(value = "") {
  const numbers = onlyNumbers(value);

  if (!numbers) {
    return 0;
  }

  return Number(numbers) / 100;
}

// Converte data brasileira DD/MM/AAAA para formato ISO AAAA-MM-DD.
// Útil para enviar datas para APIs ou banco de dados.
export function dateBRToISO(value = "") {
  const [day, month, year] = String(value).split("/");

  if (!day || !month || !year) {
    return "";
  }

  return `${year}-${month}-${day}`;
}

// Converte data ISO AAAA-MM-DD para DD/MM/AAAA.
export function dateISOToBR(value = "") {
  if (!value) {
    return "";
  }

  const [year, month, day] = String(value).split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${day}/${month}/${year}`;
}