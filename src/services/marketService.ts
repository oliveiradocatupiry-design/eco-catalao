import { mockCatsRates } from "../data/cats";
import type { MarketEntry, Material } from "../types";
export function parseQuantity(
  input: string,
  unit: Material["unidadeDeMedida"],
): { value: number; error?: undefined } | { value?: undefined; error: string } {
  const text = input.trim();
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(text))
    return {
      error: "Digite uma quantidade válida, com até duas casas decimais.",
    };
  const value = Number(text.replace(",", "."));
  if (!Number.isFinite(value) || value <= 0)
    return { error: "A quantidade precisa ser maior que zero." };
  if (value > 10000)
    return { error: "Use até 10.000 por registro nesta demonstração." };
  if (unit === "unidade" && !Number.isInteger(value))
    return { error: "Para unidades, informe um número inteiro, como 50." };
  return { value };
}
export const estimateCats = (material: Material, quantity: number) =>
  Math.round(mockCatsRates[material.id] * quantity * 100) / 100;
export const balances = (entries: MarketEntry[]) =>
  entries.reduce(
    (total, entry) => {
      total[entry.status] =
        Math.round((total[entry.status] + entry.cats) * 100) / 100;
      return total;
    },
    { pending: 0, confirmed: 0 },
  );
export const number = (value: number) =>
  value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
