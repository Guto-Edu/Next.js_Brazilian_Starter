# Formatters

Arquivo responsável por centralizar funções de formatação usadas no projeto.

Local:

```txt
/src/lib/formatters.js
```

Essas funções ajudam a manter máscaras e conversões padronizadas no sistema, principalmente para dados no padrão brasileiro, como CPF, CNPJ, CEP, telefone, datas, moeda e números.

A ideia é evitar repetição de código em formulários, tabelas, páginas e componentes.

---

## Como importar

```js
import {
  formatCPF,
  formatCNPJ,
  formatCurrencyBR,
  formatDateBR,
} from "@/lib/formatters";
```

---

## Funções disponíveis

### `onlyNumbers(value)`

Remove tudo que não for número.

```js
onlyNumbers("CPF: 123.456.789-00");
// "12345678900"
```

Útil para limpar valores antes de aplicar máscaras em CPF, CNPJ, CEP, telefone, dinheiro e datas.

---

### `onlyLetters(value)`

Remove números, símbolos e caracteres especiais, mantendo apenas letras e espaços.

```js
onlyLetters("Maria123 @Eduarda");
// "Maria Eduarda"
```

Pode ser usada em campos de nome, iniciais ou códigos textuais.

---

### `limitChars(value, max)`

Limita uma string a uma quantidade máxima de caracteres.

```js
limitChars("Athletic Club", 8);
// "Athleti"
```

Útil para inputs com limite visual ou campos com tamanho controlado.

---

## Documentos

### `formatCPF(value)`

Formata CPF no padrão brasileiro.

```js
formatCPF("12345678900");
// "123.456.789-00"
```

A função limita o valor a 11 dígitos.

---

### `formatCNPJ(value)`

Formata CNPJ no padrão brasileiro.

```js
formatCNPJ("12345678000199");
// "12.345.678/0001-99"
```

A função limita o valor a 14 dígitos.

---

### `formatCPForCNPJ(value)`

Formata automaticamente como CPF ou CNPJ, de acordo com a quantidade de números informada.

```js
formatCPForCNPJ("12345678900");
// "123.456.789-00"

formatCPForCNPJ("12345678000199");
// "12.345.678/0001-99"
```

Até 11 dígitos, aplica CPF. Acima disso, aplica CNPJ.

---

## Endereço

### `formatCEP(value)`

Formata CEP no padrão brasileiro.

```js
formatCEP("36300000");
// "36300-000"
```

A função limita o valor a 8 dígitos.

---

## Contato

### `formatPhoneBR(value)`

Formata telefone brasileiro.

Para telefones com até 10 dígitos:

```js
formatPhoneBR("3233710000");
// "(32) 3371-0000"
```

Para celulares com 11 dígitos:

```js
formatPhoneBR("32999990000");
// "(32) 99999-0000"
```

A função limita o valor a 11 dígitos.

---

## Datas e horários

### `formatDateBR(value)`

Formata uma data no padrão `DD/MM/AAAA`.

```js
formatDateBR("11062026");
// "11/06/2026"
```

Essa função apenas aplica a máscara visual. Ela não valida se a data existe.

Exemplo:

```js
formatDateBR("99099999");
// "99/09/9999"
```

---

### `formatMonthYearBR(value)`

Formata mês e ano no padrão `MM/AAAA`.

```js
formatMonthYearBR("062026");
// "06/2026"
```

Útil para validade de cartão, competência, mês de referência e filtros mensais.

---

### `formatTimeBR(value)`

Formata hora no padrão `HH:mm`.

```js
formatTimeBR("1430");
// "14:30"
```

Essa função apenas aplica a máscara visual. Ela não valida se o horário é real.

---

### `formatDateTimeBR(value)`

Formata data e hora no padrão `DD/MM/AAAA HH:mm`.

```js
formatDateTimeBR("110620261430");
// "11/06/2026 14:30"
```

A função limita o valor a 12 dígitos.

---

## Valores financeiros e números

### `formatCurrencyBR(value)`

Formata um valor em moeda brasileira.

```js
formatCurrencyBR("123456");
// "R$ 1.234,56"
```

A função considera os dois últimos dígitos como centavos.

Exemplos:

```js
formatCurrencyBR("1000");
// "R$ 10,00"

formatCurrencyBR("99");
// "R$ 0,99"
```

Quando o valor estiver vazio, retorna uma string vazia.

```js
formatCurrencyBR("");
// ""
```

---

### `formatNumberBR(value, options)`

Formata número no padrão brasileiro usando `Intl.NumberFormat`.

```js
formatNumberBR(1234.5);
// "1.234,5"
```

Também aceita opções nativas do `Intl.NumberFormat`.

```js
formatNumberBR(1234.5, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
// "1.234,50"
```

Se o valor não puder ser convertido para número, retorna uma string vazia.

---

### `formatPercentBR(value)`

Formata porcentagem simples.

```js
formatPercentBR("15");
// "15%"
```

A função limita o valor a 3 dígitos.

```js
formatPercentBR("1000");
// "100%"
```

Quando o valor estiver vazio, retorna uma string vazia.

---

## Veículos

### `formatVehiclePlate(value)`

Formata placa de veículo.

Aceita o padrão antigo:

```js
formatVehiclePlate("ABC1234");
// "ABC-1234"
```

E também o padrão Mercosul:

```js
formatVehiclePlate("ABC1D23");
// "ABC1D23"
```

A função remove caracteres inválidos, deixa tudo em maiúsculo e limita o valor a 7 caracteres.

---

## Texto

### `formatSlug(value)`

Converte um texto para slug.

```js
formatSlug("Meu Projeto Legal");
// "meu-projeto-legal"
```

Também remove acentos, caracteres especiais e espaços duplicados.

```js
formatSlug("São João del Rei!");
// "sao-joao-del-rei"
```

Útil para URLs, identificadores amigáveis e rotas dinâmicas.

---

## Conversões

### `currencyBRToNumber(value)`

Converte uma moeda brasileira formatada para número.

```js
currencyBRToNumber("R$ 1.234,56");
// 1234.56
```

Se o valor estiver vazio, retorna `0`.

```js
currencyBRToNumber("");
// 0
```

Essa função é útil antes de enviar valores monetários para API ou banco de dados.

---

### `dateBRToISO(value)`

Converte uma data no formato brasileiro para ISO.

```js
dateBRToISO("11/06/2026");
// "2026-06-11"
```

Formato de entrada esperado:

```txt
DD/MM/AAAA
```

Formato de saída:

```txt
AAAA-MM-DD
```

Útil para enviar datas para APIs, banco de dados ou filtros.

Se a data estiver incompleta, retorna uma string vazia.

---

### `dateISOToBR(value)`

Converte uma data ISO para o formato brasileiro.

```js
dateISOToBR("2026-06-11");
// "11/06/2026"
```

Formato de entrada esperado:

```txt
AAAA-MM-DD
```

Formato de saída:

```txt
DD/MM/AAAA
```

Se o valor estiver vazio ou incompleto, retorna uma string vazia.

---

## Boas práticas

Use essas funções principalmente em inputs, tabelas, cards e telas de visualização.

Exemplo em input:

```jsx
<input
  value={form.cpf}
  onChange={(event) =>
    setForm({
      ...form,
      cpf: formatCPF(event.target.value),
    })
  }
/>
```

Exemplo antes de enviar para API:

```js
const payload = {
  cpf: onlyNumbers(form.cpf),
  valor: currencyBRToNumber(form.valor),
  dataNascimento: dateBRToISO(form.dataNascimento),
};
```

---

## Observações importantes

Essas funções cuidam apenas da formatação visual ou conversão simples dos dados.

Elas não substituem validações reais.

Por exemplo:

* `formatCPF` não valida se o CPF é verdadeiro.
* `formatCNPJ` não valida se o CNPJ existe.
* `formatDateBR` não valida se a data é válida.
* `formatTimeBR` não valida se o horário existe.
* `formatCEP` não consulta endereço.

Para validações de regra de negócio, use funções específicas de validação em outro arquivo, como:

```txt
/src/lib/validators.js
```

---

## Resumo rápido

| Função               | Uso                                 |
| -------------------- | ----------------------------------- |
| `onlyNumbers`        | Remove tudo que não for número      |
| `onlyLetters`        | Remove tudo que não for letra       |
| `limitChars`         | Limita quantidade de caracteres     |
| `formatCPF`          | Formata CPF                         |
| `formatCNPJ`         | Formata CNPJ                        |
| `formatCPForCNPJ`    | Formata CPF ou CNPJ automaticamente |
| `formatCEP`          | Formata CEP                         |
| `formatPhoneBR`      | Formata telefone brasileiro         |
| `formatDateBR`       | Formata data brasileira             |
| `formatMonthYearBR`  | Formata mês e ano                   |
| `formatTimeBR`       | Formata hora                        |
| `formatDateTimeBR`   | Formata data e hora                 |
| `formatCurrencyBR`   | Formata moeda brasileira            |
| `formatNumberBR`     | Formata número brasileiro           |
| `formatPercentBR`    | Formata porcentagem                 |
| `formatVehiclePlate` | Formata placa de veículo            |
| `formatSlug`         | Gera slug para texto                |
| `currencyBRToNumber` | Converte moeda BR para número       |
| `dateBRToISO`        | Converte data BR para ISO           |
| `dateISOToBR`        | Converte data ISO para BR           |
