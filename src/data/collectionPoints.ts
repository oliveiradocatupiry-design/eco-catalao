import type { CollectionPoint } from "../types";
// Coordenadas sintéticas próximas a 0,0: NÃO representam o Catalão ou locais de entrega.
export const demoRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};
export const collectionPoints: CollectionPoint[] = [
  {
    id: "p1",
    name: "Ponto de coleta demonstrativo 1",
    type: "Recebimento de recicláveis",
    address: "Setor A · endereço fictício",
    hours: "Sábado, 8h às 12h · exemplo",
    materials: ["Lata de alumínio", "Garrafa PET", "Papelão"],
    coordinate: { latitude: 0.009, longitude: -0.008 },
  },
  {
    id: "p2",
    name: "Ponto de coleta demonstrativo 2",
    type: "Ação do Mercado Verde",
    address: "Setor B · endereço fictício",
    hours: "Quarta, 9h às 11h · exemplo",
    materials: ["Papel", "Papelão", "Plástico"],
    coordinate: { latitude: -0.009, longitude: 0.008 },
  },
];
