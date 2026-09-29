import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import * as Location from "expo-location";
export type Coordinate = { latitude: number; longitude: number };
export function useUserLocation() {
  const [coordinate, setCoordinate] = useState<Coordinate>();
  const [message, setMessage] = useState("Solicitando acesso à localização…");
  const [loading, setLoading] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(true);
  const attempted = useRef(false);
  const version = useRef(0);
  const refresh = useCallback(async () => {
    const request = ++version.current;
    setCoordinate(undefined);
    setLoading(true);
    setMessage("Buscando sua localização…");
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (request !== version.current) return;
      setCanAskAgain(permission.canAskAgain);
      if (!permission.granted) {
        setMessage(
          "Não foi possível acessar sua localização. Você ainda pode visualizar os pontos de coleta.",
        );
        return;
      }
      const position = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error("timeout")), 12000);
        }),
      ]);
      if (request !== version.current) return;
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setMessage(
        "Sua localização foi encontrada. Ela não é salva nem enviada pelo aplicativo.",
      );
    } catch {
      if (request === version.current)
        setMessage(
          "Sua localização está indisponível no momento. Ative a localização do aparelho e tente novamente. Os pontos continuam disponíveis.",
        );
    } finally {
      if (timer) clearTimeout(timer);
      if (request === version.current) setLoading(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      if (!attempted.current) {
        attempted.current = true;
        void refresh();
      }
    }, [refresh]),
  );
  return { coordinate, message, loading, refresh, canAskAgain };
}
