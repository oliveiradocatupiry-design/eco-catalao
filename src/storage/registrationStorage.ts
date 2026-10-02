import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";
import type { RegistrationStorage } from "./contracts";
import type { WasteRegistration } from "../types/registration";

let opening: Promise<SQLiteDatabase> | undefined;
async function database() {
  if (!opening)
    opening = (async () => {
      const db = await openDatabaseAsync("ecocatalao.db");
      try {
        const version = await db.getFirstAsync<{ user_version: number }>(
          "PRAGMA user_version",
        );
        if ((version?.user_version ?? 0) > 1)
          throw new Error("Versão incompatível");
        await db.withTransactionAsync(async () => {
          await db.execAsync(
            "CREATE TABLE IF NOT EXISTS registrations (id TEXT PRIMARY KEY NOT NULL, payload TEXT NOT NULL); PRAGMA user_version = 1;",
          );
        });
        return db;
      } catch (error) {
        await db.closeAsync();
        throw error;
      }
    })().catch((error) => {
      opening = undefined;
      throw error;
    });
  return opening;
}
export const registrationStorage: RegistrationStorage = {
  async list() {
    const rows = await (
      await database()
    ).getAllAsync<{ payload: string }>("SELECT payload FROM registrations");
    return rows.map((row) => JSON.parse(row.payload) as WasteRegistration);
  },
  async insert(entry) {
    await (
      await database()
    ).runAsync(
      "INSERT INTO registrations (id, payload) VALUES (?, ?)",
      entry.id,
      JSON.stringify(entry),
    );
  },
  async update(entry) {
    const result = await (
      await database()
    ).runAsync(
      "UPDATE registrations SET payload = ? WHERE id = ?",
      JSON.stringify(entry),
      entry.id,
    );
    if (result.changes !== 1) throw new Error("Registro ausente");
  },
  async remove(id) {
    const result = await (
      await database()
    ).runAsync("DELETE FROM registrations WHERE id = ?", id);
    if (result.changes !== 1) throw new Error("Registro ausente");
  },
};
