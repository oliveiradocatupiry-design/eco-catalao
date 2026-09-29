import { getMaterial } from "../data/materials";
import type {
  RegistrationDraft,
  WasteRegistration,
} from "../types/registration";

function positiveNumber(input: string, label: string, integer = false) {
  if (!input.trim()) return undefined;
  const normalized = input.trim().replace(",", ".");
  const value = Number(normalized);
  if (
    !/^\d+(\.\d+)?$/.test(normalized) ||
    !Number.isFinite(value) ||
    value <= 0 ||
    value > 100000 ||
    (integer && !Number.isInteger(value))
  )
    throw new Error(
      `${label}: informe ${integer ? "um número inteiro" : "um valor"} maior que zero e até 100.000.`,
    );
  return value;
}
export function createRegistration(
  draft: RegistrationDraft,
  id: string,
  date = new Date().toISOString(),
): WasteRegistration {
  const material = getMaterial(draft.materialId);
  if (!material) throw new Error("Selecione um material da lista.");
  const quantity = positiveNumber(draft.quantity, "Quantidade", true);
  const weight = positiveNumber(draft.weight, "Peso");
  if (quantity === undefined && weight === undefined)
    throw new Error("Informe a quantidade ou o peso.");
  return {
    id,
    materialId: material.id,
    quantity,
    weight,
    photo: draft.photo,
    date,
    status: "Aguardando entrega",
    cats: null,
  };
}
