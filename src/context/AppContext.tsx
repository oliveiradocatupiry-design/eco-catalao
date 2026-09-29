import {
  createContext,
  useContext,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { createRegistration } from "../services/registrationService";
import type {
  RegistrationDraft,
  WasteRegistration,
} from "../types/registration";
function useAppState() {
  const [entries, setEntries] = useState<WasteRegistration[]>([]);
  const sequence = useRef(0);
  function register(draft: RegistrationDraft) {
    const entry = createRegistration(
      draft,
      `local-${Date.now()}-${sequence.current++}`,
    );
    setEntries((current) => [entry, ...current]);
    return entry;
  }
  return { entries, register };
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
