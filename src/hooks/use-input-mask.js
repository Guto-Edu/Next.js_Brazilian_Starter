"use client";

// Hook para aplicar máscaras em inputs no padrão brasileiro.
// Ele foi pensado para funcionar bem com inputs controlados no React.

import { useCallback, useMemo, useState } from "react";

import {
  currencyBRToNumber,
  formatCEP,
  formatCNPJ,
  formatCPF,
  formatCPForCNPJ,
  formatCurrencyBR,
  formatDateBR,
  formatDateTimeBR,
  formatMonthYearBR,
  formatPercentBR,
  formatPhoneBR,
  formatTimeBR,
  formatVehiclePlate,
  onlyNumbers,
} from "@/lib/formatters";

// Lista de máscaras disponíveis.
// Usar constantes evita erro de digitação no restante do projeto.
export const INPUT_MASKS = {
  CPF: "cpf",
  CNPJ: "cnpj",
  CPF_CNPJ: "cpfCnpj",
  PHONE: "phone",
  CEP: "cep",
  DATE: "date",
  MONTH_YEAR: "monthYear",
  TIME: "time",
  DATE_TIME: "dateTime",
  CURRENCY: "currency",
  PERCENT: "percent",
  PLATE: "plate",
  NUMBER: "number",
};

// Aplica a máscara correta com base no tipo informado.
export function applyInputMask(value = "", mask = "") {
  switch (mask) {
    case INPUT_MASKS.CPF:
      return formatCPF(value);

    case INPUT_MASKS.CNPJ:
      return formatCNPJ(value);

    case INPUT_MASKS.CPF_CNPJ:
      return formatCPForCNPJ(value);

    case INPUT_MASKS.PHONE:
      return formatPhoneBR(value);

    case INPUT_MASKS.CEP:
      return formatCEP(value);

    case INPUT_MASKS.DATE:
      return formatDateBR(value);

    case INPUT_MASKS.MONTH_YEAR:
      return formatMonthYearBR(value);

    case INPUT_MASKS.TIME:
      return formatTimeBR(value);

    case INPUT_MASKS.DATE_TIME:
      return formatDateTimeBR(value);

    case INPUT_MASKS.CURRENCY:
      return formatCurrencyBR(value);

    case INPUT_MASKS.PERCENT:
      return formatPercentBR(value);

    case INPUT_MASKS.PLATE:
      return formatVehiclePlate(value);

    case INPUT_MASKS.NUMBER:
      return onlyNumbers(value);

    default:
      return value;
  }
}

// Hook principal de máscara.
// Ele devolve value, setValue, onChange e utilitários para usar no input.
export function useInputMask(initialValue = "", mask = "") {
  // Estado interno já começa formatado.
  const [value, setValueState] = useState(() =>
    applyInputMask(initialValue, mask)
  );

  // Atualiza o valor manualmente já aplicando a máscara.
  const setValue = useCallback(
    (nextValue) => {
      setValueState(applyInputMask(nextValue, mask));
    },
    [mask]
  );

  // Função para usar direto no onChange do input.
  const onChange = useCallback(
    (event) => {
      const nextValue = event?.target?.value ?? "";
      setValueState(applyInputMask(nextValue, mask));
    },
    [mask]
  );

  // Limpa o input.
  const clear = useCallback(() => {
    setValueState("");
  }, []);

  // Valor sem máscara.
  // Útil para enviar CPF, CNPJ, CEP, telefone ou dinheiro limpo para API.
  const rawValue = useMemo(() => onlyNumbers(value), [value]);

  // Valor numérico.
  // No caso de moeda, converte corretamente centavos.
  const numericValue = useMemo(() => {
    if (mask === INPUT_MASKS.CURRENCY) {
      return currencyBRToNumber(value);
    }

    const numbers = onlyNumbers(value);

    if (!numbers) {
      return 0;
    }

    return Number(numbers);
  }, [mask, value]);

  return {
    // Valor formatado para exibir no input.
    value,

    // Valor sem pontuação, traços, barras ou símbolos.
    rawValue,

    // Valor convertido para número.
    numericValue,

    // Função para usar no onChange.
    onChange,

    // Função para alterar o valor manualmente.
    setValue,

    // Função para limpar o input.
    clear,
  };
}