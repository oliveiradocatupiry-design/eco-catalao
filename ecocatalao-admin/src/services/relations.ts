import type { Entity, Kind } from "../types/catalog";

export function validateRelations(entity: Entity, records: Entity[]) {
  const exists = (kind: Kind, id: string) =>
    records.some((r) => r.kind === kind && r.id === id);
  if (entity.kind === "subtypes" && !exists("types", entity.typeId))
    throw new Error("Selecione um tipo de resíduo existente.");
  if (
    (entity.kind === "ideas" || entity.kind === "education") &&
    entity.subtypeId &&
    !exists("subtypes", entity.subtypeId)
  )
    throw new Error("Selecione um subtipo existente.");
  if (
    entity.kind === "points" &&
    entity.materialIds.some((id) => !exists("subtypes", id))
  )
    throw new Error("Selecione somente materiais cadastrados.");
}
export function assertCanDelete(entity: Entity, records: Entity[]) {
  const linked = records.filter(
    (r) =>
      (entity.kind === "types" &&
        r.kind === "subtypes" &&
        r.typeId === entity.id) ||
      (entity.kind === "subtypes" &&
        (((r.kind === "ideas" || r.kind === "education") &&
          r.subtypeId === entity.id) ||
          (r.kind === "points" && r.materialIds.includes(entity.id)))),
  );
  if (linked.length)
    throw new Error(
      `Este registro possui ${linked.length} vínculo(s): ${linked.map((r) => r.name).join(", ")}. Remova ou altere esses vínculos antes de excluir.`,
    );
}
export function assertIntegrity(records: Entity[]) {
  const keys = records.map((r) => `${r.kind}:${r.id}`);
  if (new Set(keys).size !== keys.length)
    throw new Error("Há identificadores duplicados no armazenamento.");
  records.forEach((r) => validateRelations(r, records));
}
