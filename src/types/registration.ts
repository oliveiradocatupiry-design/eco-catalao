import type { MaterialId } from "./index";
export interface WasteRegistration {
  id: string;
  materialId: MaterialId;
  quantity?: number;
  weight?: number;
  photo?: string;
  date: string;
  status: "Aguardando entrega";
  cats: null;
}
export interface RegistrationDraft {
  materialId: string;
  quantity: string;
  weight: string;
  photo?: string;
}
