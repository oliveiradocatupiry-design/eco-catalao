import type { IconName } from "../components/ui";
export interface WasteType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: IconName;
}
export const wasteTypes: WasteType[] = [
  {
    id: "plastico",
    name: "Plástico",
    description: "Garrafas e embalagens: cada tipo tem seu cuidado.",
    color: "#DFF3E9",
    icon: "bottle-soda-classic-outline",
  },
  {
    id: "papel",
    name: "Papel",
    description: "Folhas e caixas limpas e secas podem ganhar outro destino.",
    color: "#F4E9D6",
    icon: "file-document-outline",
  },
  {
    id: "metal",
    name: "Metal",
    description: "Latas e objetos de metal, separados com cuidado.",
    color: "#DDEEF1",
    icon: "cup-outline",
  },
  {
    id: "vidro",
    name: "Vidro",
    description: "Potes e garrafas exigem atenção no manuseio.",
    color: "#E4EADB",
    icon: "glass-wine",
  },
  {
    id: "multicamadas",
    name: "Multicamadas",
    description: "Embalagens que combinam diferentes materiais.",
    color: "#F4E9D6",
    icon: "package-variant",
  },
];
