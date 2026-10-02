import { createContext, useContext } from "react";
import type { CatalogService } from "../services/CatalogService";
import type { Entity } from "../types/catalog";
export type CatalogContextValue = {
  records: Entity[];
  loading: boolean;
  error: string;
  notice: string;
  service: CatalogService;
  refresh: () => Promise<void>;
  mutate: (action: () => Promise<unknown>, message: string) => Promise<void>;
  dismiss: () => void;
};
export const CatalogContext = createContext<CatalogContextValue | null>(null);
export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("CatalogProvider ausente.");
  return value;
}
