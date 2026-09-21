import { useEffect } from "react";
import { usePathname } from "expo-router";
import { useApp } from "../context/AppContext";
// Fotos existem apenas no fluxo de identificação. Abandonar o fluxo limpa seu cache.
export function FlowPrivacy() {
  const pathname = usePathname();
  const { clearFlow } = useApp();
  useEffect(() => {
    if (
      !["/camera", "/resultado", "/corrigir", "/adicionar"].includes(pathname)
    )
      clearFlow();
  }, [pathname, clearFlow]);
  return null;
}
