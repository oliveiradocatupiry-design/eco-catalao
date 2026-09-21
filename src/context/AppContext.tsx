import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { File } from "expo-file-system";
import { initialEntries } from "../data/cats";
import { getMaterial } from "../data/materials";
import { classificationService } from "../services/mockClassificationService";
import {
  balances,
  estimateCats,
  parseQuantity,
} from "../services/marketService";
import type { Classification, MarketEntry, MaterialId } from "../types";

export function deletePhoto(uri: string | null) {
  if (!uri?.startsWith("file://")) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    /* Cache temporário: o SO também pode remover o arquivo. */
  }
}
function useAppState() {
  const [entries, setEntries] = useState<MarketEntry[]>(initialEntries);
  const [classification, setClassification] = useState<Classification | null>(
    null,
  );
  const [photo, setPhotoState] = useState<string | null>(null);
  const photoRef = useRef<string | null>(null);
  const sequence = useRef(0);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState("");
  useEffect(() => () => deletePhoto(photoRef.current), []);
  const setPhoto = useCallback((uri: string | null) => {
    if (photoRef.current !== uri) deletePhoto(photoRef.current);
    photoRef.current = uri;
    setPhotoState(uri);
  }, []);
  const clearFlow = useCallback(() => {
    setPhoto(null);
    setClassification(null);
    setDraft("");
  }, [setPhoto]);
  function register(materialId: MaterialId, input: string) {
    const material = getMaterial(materialId);
    if (!material) throw new Error("Selecione um material válido.");
    const parsed = parseQuantity(input, material.unidadeDeMedida);
    if (parsed.error !== undefined) throw new Error(parsed.error);
    const entry: MarketEntry = {
      id: `local-${Date.now()}-${sequence.current++}`,
      materialId,
      quantity: parsed.value,
      cats: estimateCats(material, parsed.value),
      status: "pending",
      date: new Date().toISOString(),
    };
    setEntries((current) => [entry, ...current]);
    clearFlow();
    setNotice(
      "Material registrado! Seus CATS estão estimados, aguardando a entrega.",
    );
  }
  return {
    entries,
    classification,
    setClassification,
    photo,
    setPhoto,
    clearFlow,
    register,
    draft,
    setDraft,
    notice,
    setNotice,
    totals: balances(entries),
    accept: () =>
      setClassification((current) =>
        current ? { ...current, accepted: true } : null,
      ),
    correct: (id: MaterialId) =>
      setClassification((current) =>
        current ? classificationService.correct(current, id) : null,
      ),
    remove: (id: string) =>
      setEntries((current) =>
        current.filter(
          (entry) => entry.id !== id || entry.status === "confirmed",
        ),
      ),
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
