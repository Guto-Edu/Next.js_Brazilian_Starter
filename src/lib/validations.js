// Funções de validação reutilizáveis.
// Este arquivo traz exemplos úteis para projetos brasileiros.
// Para formulários grandes, você pode combinar isso com Zod.

import { onlyNumbers } from "@/lib/formatters";

// Valida se o valor está vazio.
// Considera string com espaços como vazia.
export function isEmpty(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

// Valida e-mail com uma regra simples.
// Não tenta cobrir todos os casos possíveis da RFC, porque isso seria exagero.
export function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

// Valida CPF brasileiro.
export function isValidCPF(value = "") {
  const cpf = onlyNumbers(value);

  if (cpf.length !== 11) {
    return false;
  }

  // Rejeita CPFs com todos os dígitos iguais.
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;

  // Calcula o primeiro dígito verificador.
  for (let index = 0; index < 9; index += 1) {
    sum += Number(cpf[index]) * (10 - index);
  }

  let firstDigit = (sum * 10) % 11;
  firstDigit = firstDigit === 10 ? 0 : firstDigit;

  if (firstDigit !== Number(cpf[9])) {
    return false;
  }

  sum = 0;

  // Calcula o segundo dígito verificador.
  for (let index = 0; index < 10; index += 1) {
    sum += Number(cpf[index]) * (11 - index);
  }

  let secondDigit = (sum * 10) % 11;
  secondDigit = secondDigit === 10 ? 0 : secondDigit;

  return secondDigit === Number(cpf[10]);
}

// Valida CNPJ brasileiro.
export function isValidCNPJ(value = "") {
  const cnpj = onlyNumbers(value);

  if (cnpj.length !== 14) {
    return false;
  }

  // Rejeita CNPJs com todos os dígitos iguais.
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const calculateDigit = (base, weights) => {
    const sum = base
      .split("")
      .reduce((acc, digit, index) => acc + Number(digit) * weights[index], 0);

    const rest = sum % 11;

    return rest < 2 ? 0 : 11 - rest;
  };

  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstDigit = calculateDigit(cnpj.slice(0, 12), firstWeights);
  const secondDigit = calculateDigit(cnpj.slice(0, 13), secondWeights);

  return firstDigit === Number(cnpj[12]) && secondDigit === Number(cnpj[13]);
}

// Valida CPF ou CNPJ automaticamente.
export function isValidCPForCNPJ(value = "") {
  const numbers = onlyNumbers(value);

  if (numbers.length <= 11) {
    return isValidCPF(numbers);
  }

  return isValidCNPJ(numbers);
}

// Valida telefone brasileiro com DDD.
// Aceita 10 ou 11 dígitos.
export function isValidPhoneBR(value = "") {
  const phone = onlyNumbers(value);

  return phone.length === 10 || phone.length === 11;
}

// Valida CEP brasileiro.
export function isValidCEP(value = "") {
  const cep = onlyNumbers(value);

  return cep.length === 8;
}

// Valida data no padrão DD/MM/AAAA.
// Além da máscara, verifica se a data realmente existe.
export function isValidDateBR(value = "") {
  const [day, month, year] = String(value).split("/").map(Number);

  if (!day || !month || !year) {
    return false;
  }

  if (year < 1900 || year > 2999) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Valida horário no padrão HH:mm.
export function isValidTimeBR(value = "") {
  const [hour, minute] = String(value).split(":").map(Number);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return false;
  }

  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

// Valida se uma string tem tamanho mínimo.
export function hasMinLength(value = "", min = 0) {
  return String(value).trim().length >= min;
}

// Valida se uma string tem tamanho máximo.
export function hasMaxLength(value = "", max = 0) {
  return String(value).trim().length <= max;
}

// Valida se um valor numérico está dentro de uma faixa.
export function isBetween(value, min, max) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return false;
  }

  return number >= min && number <= max;
}

// Valida senha forte de forma simples.
// Exige mínimo de 8 caracteres, letra maiúscula, letra minúscula e número.
export function isStrongPassword(value = "") {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}