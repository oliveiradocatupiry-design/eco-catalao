import { createMocks } from "../data/mocks";
import {
  databaseSchema,
  entitySchema,
  type Database,
  type Entity,
  type Kind,
  type Status,
} from "../types/catalog";
import { assertCanDelete, assertIntegrity } from "../services/relations";
import type { CatalogRepository } from "./CatalogRepository";

export const STORAGE_KEY = "ecocatalao.admin.v1";
export type StoragePort = Pick<Storage, "getItem" | "setItem">;
export class LocalRepository implements CatalogRepository {
  constructor(private storage: StoragePort) {}
  private read(): Database {
    let raw: string | null;
    try {
      raw = this.storage.getItem(STORAGE_KEY);
    } catch {
      throw new Error(
        "O navegador bloqueou o armazenamento local. Permita o armazenamento para usar o painel.",
      );
    }
    if (raw === null) {
      const initial = createMocks();
      this.write(initial);
      return initial;
    }
    try {
      const data = databaseSchema.parse(JSON.parse(raw));
      assertIntegrity(data.records);
      return data;
    } catch {
      throw new Error(
        "Os dados locais estão inválidos ou têm uma versão incompatível. Eles foram preservados. Você pode restaurar os exemplos em Configurações.",
      );
    }
  }
  private write(data: Database) {
    assertIntegrity(data.records);
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      throw new Error(
        "Não foi possível salvar no navegador. Verifique o espaço disponível e a permissão de armazenamento.",
      );
    }
  }
  async getAll() {
    return this.read().records;
  }
  async getById(kind: Kind, id: string) {
    return this.read().records.find((r) => r.kind === kind && r.id === id);
  }
  async create(entity: Entity) {
    const data = this.read();
    const parsed = entitySchema.parse(entity);
    if (data.records.some((r) => r.kind === entity.kind && r.id === entity.id))
      throw new Error("Este identificador já existe.");
    data.records.push(parsed);
    this.write(data);
    return parsed;
  }
  async update(entity: Entity) {
    const data = this.read();
    const index = data.records.findIndex(
      (r) => r.kind === entity.kind && r.id === entity.id,
    );
    if (index < 0)
      throw new Error("Este registro não existe mais. Atualize a página.");
    const parsed = entitySchema.parse(entity);
    data.records[index] = parsed;
    this.write(data);
    return parsed;
  }
  async delete(kind: Kind, id: string) {
    const data = this.read();
    const entity = data.records.find((r) => r.kind === kind && r.id === id);
    if (!entity) throw new Error("Registro não encontrado.");
    assertCanDelete(entity, data.records);
    data.records = data.records.filter(
      (r) => !(r.kind === kind && r.id === id),
    );
    this.write(data);
  }
  async setActive(kind: Kind, id: string, status: Status) {
    const entity = await this.getById(kind, id);
    if (!entity) throw new Error("Registro não encontrado.");
    return this.update({
      ...entity,
      status,
      updatedAt: new Date().toISOString(),
    });
  }
  async reset() {
    const initial = createMocks();
    this.write(initial);
    return initial.records;
  }
}
