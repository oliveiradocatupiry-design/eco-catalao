import type { WasteRegistration } from "../types/registration";

export interface RegistrationStorage {
  list(): Promise<WasteRegistration[]>;
  insert(entry: WasteRegistration): Promise<void>;
  update(entry: WasteRegistration): Promise<void>;
  remove(id: string): Promise<void>;
}
export interface PhotoStorage {
  persist(uri: string): Promise<string>;
  remove(uri: string): Promise<void>;
}
