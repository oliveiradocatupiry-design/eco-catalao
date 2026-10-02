import type { CatalogRepository } from "../repositories/CatalogRepository";
import {
  entitySchema,
  ValidationError,
  type Draft,
  type Entity,
  type FieldErrors,
  type Kind,
  type Status,
} from "../types/catalog";
import { validateRelations } from "./relations";

export class CatalogService {
  constructor(private repository: CatalogRepository) {}
  getAll() {
    return this.repository.getAll();
  }
  getById(kind: Kind, id: string) {
    return this.repository.getById(kind, id);
  }
  async save(kind: Kind, draft: Draft, id?: string) {
    const candidate: Record<string, unknown> = {
      ...draft,
      kind,
      id: id ?? crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    };
    for (const key of ["latitude", "longitude"])
      if (key in candidate) {
        const value = String(candidate[key]).trim().replace(",", ".");
        candidate[key] = value === "" ? NaN : Number(value);
      }
    const parsed = entitySchema.safeParse(candidate);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        errors[key] ??= issue.message;
      }
      throw new ValidationError(errors);
    }
    const entity = parsed.data;
    validateRelations(entity, await this.repository.getAll());
    return id ? this.repository.update(entity) : this.repository.create(entity);
  }
  delete(kind: Kind, id: string) {
    return this.repository.delete(kind, id);
  }
  setActive(kind: Kind, id: string, status: Status) {
    return this.repository.setActive(kind, id, status);
  }
  reset() {
    return this.repository.reset();
  }
}
export function toDraft(entity: Entity): Draft {
  return Object.fromEntries(
    Object.entries(entity).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : String(value),
    ]),
  );
}
