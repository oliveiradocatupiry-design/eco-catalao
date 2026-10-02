import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { LocalRepository } from "../repositories/LocalRepository";
import { CatalogService } from "../services/CatalogService";
import { CatalogContext } from "./catalogContext";
import type { Entity } from "../types/catalog";
// Access to localStorage is deferred, so a blocked browser yields visible feedback.
const defaultService = new CatalogService(
  new LocalRepository({
    getItem: (key) => window.localStorage.getItem(key),
    setItem: (key, value) => window.localStorage.setItem(key, value),
  }),
);
export function CatalogProvider({
  children,
  service = defaultService,
}: PropsWithChildren<{ service?: CatalogService }>) {
  const [records, setRecords] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const refresh = useCallback(async () => {
    try {
      setRecords(await service.getAll());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível carregar.");
    } finally {
      setLoading(false);
    }
  }, [service]);
  useEffect(() => {
    let active = true;
    service.getAll().then(
      (data) => {
        if (active) {
          setRecords(data);
          setError("");
          setLoading(false);
        }
      },
      (e) => {
        if (active) {
          setError(
            e instanceof Error ? e.message : "Não foi possível carregar.",
          );
          setLoading(false);
        }
      },
    );
    const sync = () => void refresh();
    window.addEventListener("storage", sync);
    return () => {
      active = false;
      window.removeEventListener("storage", sync);
    };
  }, [refresh, service]);
  const mutate = async (action: () => Promise<unknown>, message: string) => {
    await action();
    await refresh();
    setNotice(message);
  };
  return (
    <CatalogContext
      value={{
        records,
        loading,
        error,
        notice,
        service,
        refresh,
        mutate,
        dismiss: () => setNotice(""),
      }}
    >
      {children}
    </CatalogContext>
  );
}
