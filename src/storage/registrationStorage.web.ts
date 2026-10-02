import type { RegistrationStorage } from "./contracts";
import type { WasteRegistration } from "../types/registration";

let opening: Promise<IDBDatabase> | undefined;
function database() {
  if (!opening)
    opening = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("ecocatalao-v2", 1);
      request.onupgradeneeded = () =>
        request.result.createObjectStore("registrations", { keyPath: "id" });
      request.onerror = () => reject(request.error);
      request.onblocked = () =>
        reject(new Error("Feche outras abas e tente novamente"));
      request.onsuccess = () => {
        request.result.onversionchange = () => {
          request.result.close();
          opening = undefined;
        };
        resolve(request.result);
      };
    }).catch((error) => {
      opening = undefined;
      throw error;
    });
  return opening;
}
async function transaction<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("registrations", mode);
    const request = operation(tx.objectStore("registrations"));
    tx.oncomplete = () => resolve(request.result);
    tx.onabort = () => reject(tx.error ?? new Error("Gravação interrompida"));
    tx.onerror = () => reject(tx.error);
  });
}
export const registrationStorage: RegistrationStorage = {
  async list() {
    return (await transaction("readonly", (store) =>
      store.getAll(),
    )) as WasteRegistration[];
  },
  async insert(entry) {
    await transaction("readwrite", (store) => store.add(entry));
  },
  async update(entry) {
    await changeExisting(entry.id, (store) => store.put(entry));
  },
  async remove(id) {
    await changeExisting(id, (store) => store.delete(id));
  },
};

async function changeExisting(
  id: string,
  change: (store: IDBObjectStore) => void,
) {
  const db = await database();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("registrations", "readwrite");
    const store = tx.objectStore("registrations");
    const request = store.getKey(id);
    request.onsuccess = () => {
      if (request.result === undefined) tx.abort();
      else change(store);
    };
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error ?? new Error("Registro ausente"));
    tx.onerror = () => reject(tx.error);
  });
}
