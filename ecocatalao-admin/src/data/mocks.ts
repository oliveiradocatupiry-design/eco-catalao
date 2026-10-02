import seed from "./seed.json";
import { databaseSchema, type Database } from "../types/catalog";
/** Snapshot semântico dos dados mobile V2 de 29/09/2026; independente em runtime. */
export function createMocks(): Database {
  return databaseSchema.parse(structuredClone(seed));
}
