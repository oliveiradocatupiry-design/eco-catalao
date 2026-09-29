import type { MaterialId } from "../types";
export interface WasteSubtype {
  id: MaterialId;
  typeId: string;
  impact: string;
  separation: string;
  reuseId: string;
}
export const wasteSubtypes: WasteSubtype[] = [
  {
    id: "pet",
    typeId: "plastico",
    impact:
      "Embalagens soltas podem chegar ao rio e se fragmentar em pedaços menores. Evitar o descarte na água ajuda a proteger o território.",
    separation:
      "Esvazie, remova os restos e deixe secar. Guarde em saco separado dos resíduos orgânicos.",
    reuseId: "vaso-pet",
  },
  {
    id: "plastico",
    typeId: "plastico",
    impact:
      "A mistura de diferentes plásticos dificulta seu aproveitamento. Separar e reduzir o consumo evita descarte desnecessário.",
    separation:
      "Separe embalagens rígidas vazias e secas. Confira o que a coleta local aceita.",
    reuseId: "organizador-plastico",
  },
  {
    id: "papelao",
    typeId: "papel",
    impact:
      "Quando molhado ou engordurado, o papelão pode perder a possibilidade de reciclagem. Protegê-lo da chuva e do rio preserva as fibras.",
    separation:
      "Desmonte as caixas, retire restos de comida e guarde em local seco.",
    reuseId: "caixa-organizadora",
  },
  {
    id: "papel",
    typeId: "papel",
    impact:
      "Aproveitar os dois lados da folha reduz o uso de papel novo. A separação correta facilita recuperar suas fibras.",
    separation:
      "Separe folhas limpas e secas de guardanapos usados e papéis sanitários.",
    reuseId: "bloco-rascunho",
  },
  {
    id: "aluminio",
    typeId: "metal",
    impact:
      "Reciclar alumínio permite recuperar material e reduzir a necessidade de extrair novos recursos.",
    separation:
      "Esvazie as latas e guarde secas. Evite manusear bordas cortantes.",
    reuseId: "reuso-lata",
  },
  {
    id: "metal",
    typeId: "metal",
    impact:
      "Reparar e reaproveitar objetos ajuda a reduzir descarte e a demanda por matéria-prima.",
    separation:
      "Separe metais comuns. Pilhas, baterias e recipientes pressurizados precisam de orientações específicas.",
    reuseId: "reuso-metal",
  },
  {
    id: "vidro",
    typeId: "vidro",
    impact:
      "O vidro abandonado pode causar cortes. A entrega correta depende da existência de coleta e processamento adequados.",
    separation:
      "Separe potes íntegros. Embale e identifique cacos; não misture lâmpadas ou cerâmicas.",
    reuseId: "pote-organizador",
  },
  {
    id: "longa-vida",
    typeId: "multicamadas",
    impact:
      "As camadas precisam de processamento específico. Confirme a aceitação para não misturar com materiais de outra cadeia.",
    separation: "Esvazie, remova resíduos e mantenha a embalagem seca.",
    reuseId: "porta-lapis",
  },
];
