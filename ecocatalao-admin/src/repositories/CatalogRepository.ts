import type { Entity, Kind, Status } from "../types/catalog";

/** Um ApiRepository futuro implementará este contrato; as páginas permanecem iguais. */
export interface CatalogRepository {
  getAll(): Promise<Entity[]>;
  getById(kind: Kind, id: string): Promise<Entity | undefined>;
  create(entity: Entity): Promise<Entity>;
  update(entity: Entity): Promise<Entity>;
  delete(kind: Kind, id: string): Promise<void>;
  setActive(kind: Kind, id: string, status: Status): Promise<Entity>;
  reset(): Promise<Entity[]>;
}
