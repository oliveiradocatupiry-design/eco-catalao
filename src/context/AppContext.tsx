import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { randomUUID } from "expo-crypto";
import {
  createRegistrationRepository,
  filterRegistrations,
} from "../services/registrationRepository";
import { registrationStorage } from "../storage/registrationStorage";
import { photoStorage } from "../storage/photoStorage";
import type {
  RegistrationDraft,
  WasteRegistration,
} from "../types/registration";

function useAppState() {
  const repository = useRef(
    createRegistrationRepository(registrationStorage, photoStorage, randomUUID),
  ).current;
  const [entries, setEntries] = useState<WasteRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [operation, setOperation] = useState("");
  const lock = useRef(false);
  async function reload() {
    if (lock.current) return;
    lock.current = true;
    setLoading(true);
    setLoadError("");
    try {
      setEntries(await repository.load());
    } catch {
      setLoadError("Não foi possível abrir seu histórico. Tente novamente.");
    } finally {
      setLoading(false);
      lock.current = false;
    }
  }
  useEffect(() => {
    void reload();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  async function mutate<T>(label: string, action: () => Promise<T>) {
    if (lock.current || loading || loadError)
      throw new Error(
        "Aguarde o carregamento do histórico ou tente abri-lo novamente.",
      );
    lock.current = true;
    setOperation(label);
    try {
      return await action();
    } finally {
      lock.current = false;
      setOperation("");
    }
  }
  function register(draft: RegistrationDraft) {
    return mutate("save", async () => {
      const entry = await repository.register(draft);
      setEntries((current) => filterRegistrations([...current, entry]));
      return entry;
    });
  }
  function edit(previous: WasteRegistration, draft: RegistrationDraft) {
    return mutate("edit", async () => {
      const entry = await repository.edit(previous, draft);
      setEntries((current) =>
        filterRegistrations(
          current.map((item) => (item.id === entry.id ? entry : item)),
        ),
      );
      return entry;
    });
  }
  function remove(entry: WasteRegistration) {
    return mutate(entry.id, async () => {
      await repository.remove(entry);
      setEntries((current) => current.filter((item) => item.id !== entry.id));
    });
  }
  return {
    entries,
    register,
    edit,
    remove,
    reload,
    loading,
    loadError,
    operation,
  };
}
const AppContext = createContext<ReturnType<typeof useAppState> | null>(null);
export function AppProvider({ children }: PropsWithChildren) {
  return (
    <AppContext.Provider value={useAppState()}>{children}</AppContext.Provider>
  );
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppProvider ausente");
  return context;
}
