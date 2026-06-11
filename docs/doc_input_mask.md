# useInputMask

Hook para aplicar máscaras em inputs controlados no React.

Local:

```txt
/src/hooks/use-input-mask.js
```

Esse hook foi criado para facilitar o uso de máscaras no padrão brasileiro, como CPF, CNPJ, telefone, CEP, data, moeda, porcentagem e placa de veículo.

Ele já entrega o valor formatado, o valor limpo, o valor numérico e funções prontas para usar no input.

---

## Quando usar

Use esse hook quando um campo precisar exibir uma máscara enquanto o usuário digita.

Exemplos comuns:

* CPF
* CNPJ
* CPF ou CNPJ
* Telefone
* CEP
* Data
* Mês e ano
* Hora
* Data e hora
* Moeda
* Porcentagem
* Placa de veículo
* Número simples

---

## Importação

```js
import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";
```

Também é possível importar a função de máscara separadamente:

```js
import { applyInputMask } from "@/hooks/use-input-mask";
```

---

## Máscaras disponíveis

As máscaras ficam centralizadas no objeto `INPUT_MASKS`.

```js
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
```

Usar constantes evita erro de digitação espalhado pelo projeto.

Em vez de usar assim:

```js
useInputMask("", "cpf");
```

Prefira usar assim:

```js
useInputMask("", INPUT_MASKS.CPF);
```

---

## `applyInputMask`

Aplica uma máscara diretamente em um valor.

```js
applyInputMask(value, mask);
```

Exemplo:

```js
applyInputMask("12345678900", INPUT_MASKS.CPF);
// "123.456.789-00"
```

Essa função é usada internamente pelo hook, mas também pode ser usada fora dele quando for necessário formatar um valor manualmente.

---

## Máscaras aceitas pelo `applyInputMask`

### CPF

```js
applyInputMask("12345678900", INPUT_MASKS.CPF);
// "123.456.789-00"
```

---

### CNPJ

```js
applyInputMask("12345678000199", INPUT_MASKS.CNPJ);
// "12.345.678/0001-99"
```

---

### CPF ou CNPJ

```js
applyInputMask("12345678900", INPUT_MASKS.CPF_CNPJ);
// "123.456.789-00"

applyInputMask("12345678000199", INPUT_MASKS.CPF_CNPJ);
// "12.345.678/0001-99"
```

---

### Telefone

```js
applyInputMask("32999990000", INPUT_MASKS.PHONE);
// "(32) 99999-0000"
```

---

### CEP

```js
applyInputMask("36300000", INPUT_MASKS.CEP);
// "36300-000"
```

---

### Data

```js
applyInputMask("11062026", INPUT_MASKS.DATE);
// "11/06/2026"
```

---

### Mês e ano

```js
applyInputMask("062026", INPUT_MASKS.MONTH_YEAR);
// "06/2026"
```

---

### Hora

```js
applyInputMask("1430", INPUT_MASKS.TIME);
// "14:30"
```

---

### Data e hora

```js
applyInputMask("110620261430", INPUT_MASKS.DATE_TIME);
// "11/06/2026 14:30"
```

---

### Moeda

```js
applyInputMask("123456", INPUT_MASKS.CURRENCY);
// "R$ 1.234,56"
```

---

### Porcentagem

```js
applyInputMask("15", INPUT_MASKS.PERCENT);
// "15%"
```

---

### Placa de veículo

```js
applyInputMask("ABC1234", INPUT_MASKS.PLATE);
// "ABC-1234"

applyInputMask("ABC1D23", INPUT_MASKS.PLATE);
// "ABC1D23"
```

---

### Número

```js
applyInputMask("abc123def456", INPUT_MASKS.NUMBER);
// "123456"
```

---

### Sem máscara

Quando nenhuma máscara conhecida é informada, o valor original é retornado.

```js
applyInputMask("Maria Eduarda", "");
// "Maria Eduarda"
```

---

## `useInputMask`

Hook principal para usar máscara em inputs controlados.

```js
const input = useInputMask(initialValue, mask);
```

Exemplo básico:

```jsx
const cpf = useInputMask("", INPUT_MASKS.CPF);

return (
  <input
    value={cpf.value}
    onChange={cpf.onChange}
    placeholder="000.000.000-00"
  />
);
```

---

## Parâmetros

### `initialValue`

Valor inicial do input.

```js
useInputMask("12345678900", INPUT_MASKS.CPF);
```

O valor inicial já entra formatado.

Resultado inicial:

```js
"123.456.789-00"
```

---

### `mask`

Tipo de máscara que será aplicada.

```js
useInputMask("", INPUT_MASKS.PHONE);
```

---

## Retorno do hook

O hook retorna um objeto com:

```js
{
  value,
  rawValue,
  numericValue,
  onChange,
  setValue,
  clear,
}
```

---

## `value`

Valor formatado para exibir no input.

```js
const cpf = useInputMask("12345678900", INPUT_MASKS.CPF);

cpf.value;
// "123.456.789-00"
```

Esse é o valor que deve ser usado no `value` do input.

```jsx
<input value={cpf.value} onChange={cpf.onChange} />
```

---

## `rawValue`

Valor sem máscara.

Remove pontuação, traços, barras, espaços e símbolos.

```js
const phone = useInputMask("(32) 99999-0000", INPUT_MASKS.PHONE);

phone.rawValue;
// "32999990000"
```

Útil para enviar dados limpos para API ou banco de dados.

```js
const payload = {
  telefone: phone.rawValue,
};
```

---

## `numericValue`

Valor convertido para número.

```js
const percent = useInputMask("15%", INPUT_MASKS.PERCENT);

percent.numericValue;
// 15
```

No caso de moeda, a conversão respeita os centavos.

```js
const price = useInputMask("R$ 1.234,56", INPUT_MASKS.CURRENCY);

price.numericValue;
// 1234.56
```

Quando não houver número, retorna `0`.

---

## `onChange`

Função pronta para usar no `onChange` do input.

```jsx
<input
  value={cpf.value}
  onChange={cpf.onChange}
/>
```

Ela pega o valor digitado, aplica a máscara e atualiza o estado interno do hook.

---

## `setValue`

Atualiza o valor manualmente, aplicando a máscara automaticamente.

```js
cpf.setValue("12345678900");
```

Depois disso:

```js
cpf.value;
// "123.456.789-00"
```

Útil para preencher campos depois de buscar dados em uma API.

```js
useEffect(() => {
  cpf.setValue(user.cpf);
}, [user]);
```

---

## `clear`

Limpa o input.

```js
cpf.clear();
```

Depois disso:

```js
cpf.value;
// ""
```

---

## Exemplo completo com CPF

```jsx
"use client";

import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";

export function CPFInput() {
  const cpf = useInputMask("", INPUT_MASKS.CPF);

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      cpf: cpf.rawValue,
    };

    console.log(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={cpf.value}
        onChange={cpf.onChange}
        placeholder="000.000.000-00"
      />

      <button type="submit">
        Salvar
      </button>
    </form>
  );
}
```

---

## Exemplo com moeda

```jsx
"use client";

import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";

export function PriceInput() {
  const price = useInputMask("", INPUT_MASKS.CURRENCY);

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      price: price.numericValue,
    };

    console.log(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={price.value}
        onChange={price.onChange}
        placeholder="R$ 0,00"
      />

      <button type="submit">
        Salvar
      </button>
    </form>
  );
}
```

---

## Exemplo com telefone

```jsx
"use client";

import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";

export function PhoneInput() {
  const phone = useInputMask("", INPUT_MASKS.PHONE);

  return (
    <input
      value={phone.value}
      onChange={phone.onChange}
      placeholder="(00) 00000-0000"
    />
  );
}
```

---

## Exemplo com CPF ou CNPJ

```jsx
"use client";

import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";

export function DocumentInput() {
  const document = useInputMask("", INPUT_MASKS.CPF_CNPJ);

  return (
    <input
      value={document.value}
      onChange={document.onChange}
      placeholder="CPF ou CNPJ"
    />
  );
}
```

---

## Exemplo preenchendo valor vindo da API

```jsx
"use client";

import { useEffect } from "react";
import { useInputMask, INPUT_MASKS } from "@/hooks/use-input-mask";

export function UserForm({ user }) {
  const phone = useInputMask("", INPUT_MASKS.PHONE);

  useEffect(() => {
    if (user?.phone) {
      phone.setValue(user.phone);
    }
  }, [user]);

  return (
    <input
      value={phone.value}
      onChange={phone.onChange}
      placeholder="Telefone"
    />
  );
}
```

---

## Exemplo de payload para API

```js
const payload = {
  cpf: cpf.rawValue,
  telefone: phone.rawValue,
  cep: cep.rawValue,
  valor: price.numericValue,
};
```

Exemplo de resultado:

```js
{
  cpf: "12345678900",
  telefone: "32999990000",
  cep: "36300000",
  valor: 1234.56
}
```

---

## Diferença entre `value`, `rawValue` e `numericValue`

| Campo          | O que é                               | Exemplo         |
| -------------- | ------------------------------------- | --------------- |
| `value`        | Valor formatado para mostrar no input | `"R$ 1.234,56"` |
| `rawValue`     | Valor limpo, apenas números           | `"123456"`      |
| `numericValue` | Valor convertido para número          | `1234.56`       |

No caso de moeda, existe uma diferença importante:

```js
value;
// "R$ 1.234,56"

rawValue;
// "123456"

numericValue;
// 1234.56
```

---

## Boas práticas

Use `value` e `onChange` diretamente no input.

```jsx
<input value={field.value} onChange={field.onChange} />
```

Use `rawValue` quando precisar salvar dados sem máscara.

```js
cpf.rawValue;
```

Use `numericValue` quando precisar salvar ou calcular valores numéricos.

```js
price.numericValue;
```

Use `setValue` para preencher o campo manualmente.

```js
field.setValue("123456");
```

Use `clear` para limpar o campo.

```js
field.clear();
```

---

## Observações importantes

Esse hook aplica máscaras visuais. Ele não valida regras de negócio.

Exemplos:

* CPF formatado não significa CPF válido.
* CNPJ formatado não significa CNPJ válido.
* Data formatada não significa data real.
* Hora formatada não significa horário válido.
* CEP formatado não significa endereço existente.

Validações devem ficar em outro arquivo, como:

```txt
/src/lib/validators.js
```

---

## Resumo rápido

| Item             | Função                                     |
| ---------------- | ------------------------------------------ |
| `INPUT_MASKS`    | Lista de máscaras disponíveis              |
| `applyInputMask` | Aplica uma máscara diretamente em um valor |
| `useInputMask`   | Hook principal para inputs mascarados      |
| `value`          | Valor formatado para exibição              |
| `rawValue`       | Valor limpo, apenas números                |
| `numericValue`   | Valor convertido para número               |
| `onChange`       | Função para usar no input                  |
| `setValue`       | Atualiza valor manualmente com máscara     |
| `clear`          | Limpa o input                              |

---

## Sugestão de uso no projeto

Para manter o padrão, prefira criar inputs reutilizáveis usando esse hook por baixo.

Exemplo:

```txt
/src/components/form/masked-input.jsx
```

Assim o projeto não fica cheio de lógica de máscara espalhada pelos formulários.
