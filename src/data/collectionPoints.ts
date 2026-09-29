import type { CollectionPoint } from "../types";
// Referência aproximada do LAGO, não levantamento das casas/comunidade.
// Estudo limnológico: CAT 1 = 3°9'41.20 S / 59°54'54.20 W.
// https://www.researchgate.net/publication/282867471
// A posição exata da comunidade e TODOS os pontos dependem de validação local.
export const communityCoordinate = { latitude: -3.16144, longitude: -59.91506 };
export const demoRegion = {
  ...communityCoordinate,
  latitudeDelta: 0.025,
  longitudeDelta: 0.025,
};
export const collectionPoints: CollectionPoint[] = [
  {
    id: "p1",
    name: "Ponto demonstrativo 1",
    type: "Exemplo de recebimento de recicláveis",
    address: "Endereço a validar com a comunidade",
    phone: "Telefone ainda não informado",
    description:
      "Local fictício para testar o mapa. Não é um ponto de entrega em funcionamento.",
    hours: "Horário a definir",
    materials: ["Lata de alumínio", "Garrafa PET", "Papelão"],
    coordinate: { latitude: -3.163, longitude: -59.912 },
  },
  {
    id: "p2",
    name: "Ponto demonstrativo 2",
    type: "Exemplo de recebimento de materiais secos",
    address: "Endereço a validar com a comunidade",
    phone: "Telefone ainda não informado",
    description:
      "Local fictício para testar a seleção e os detalhes de um ponto.",
    hours: "Horário a definir",
    materials: ["Papel", "Plástico rígido"],
    coordinate: { latitude: -3.158, longitude: -59.918 },
  },
];
