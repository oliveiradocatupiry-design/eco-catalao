export type MaterialId =
  | "aluminio"
  | "pet"
  | "papelao"
  | "papel"
  | "vidro"
  | "plastico"
  | "metal"
  | "longa-vida";
export type Unit = "unidade" | "kg";
export interface Material {
  id: MaterialId;
  nome: string;
  categoria: string;
  descricao: string;
  reciclavel: boolean;
  unidadeDeMedida: Unit;
  instrucoesDescarte: string;
  dicasReutilizacao: string;
  conteudoEducativo: string;
  icon: "can" | "bottle" | "box" | "paper" | "glass";
  color: string;
}
export interface EducationalContent {
  id: string;
  title: string;
  category: string;
  minutes: number;
  summary: string;
  icon: string;
  color: string;
  sections: { title: string; body: string }[];
}
export interface CollectionPoint {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  description: string;
  hours: string;
  materials: string[];
  coordinate: { latitude: number; longitude: number };
}
