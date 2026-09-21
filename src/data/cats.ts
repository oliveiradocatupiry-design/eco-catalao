import type { MarketEntry, MaterialId } from "../types";
// DEMONSTRAÇÃO: taxas arbitrárias, sem valor oficial, monetário ou direito de resgate.
export const mockCatsRates: Record<MaterialId, number> = {
  aluminio: 0.4,
  pet: 0.3,
  papelao: 2,
  papel: 1.5,
  vidro: 1,
  plastico: 2,
  metal: 4,
  "longa-vida": 0.2,
};
export const initialEntries: MarketEntry[] = [
  {
    id: "demo-1",
    materialId: "papelao",
    quantity: 4,
    cats: 8,
    status: "pending",
    date: "2026-09-20T12:00:00.000Z",
  },
  {
    id: "demo-2",
    materialId: "aluminio",
    quantity: 50,
    cats: 20,
    status: "confirmed",
    date: "2026-09-18T12:00:00.000Z",
  },
];
