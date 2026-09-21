import type { Material } from "../types";

export const materials: Material[] = [
  {
    id: "aluminio",
    nome: "Lata de alumínio",
    categoria: "Metal",
    descricao: "Pequena no tamanho. Grande no potencial de voltar ao ciclo.",
    reciclavel: true,
    unidadeDeMedida: "unidade",
    icon: "can",
    color: "#DDEEF1",
    instrucoesDescarte:
      "Esvazie a lata e retire os resíduos. Guarde seca e separada dos rejeitos. Consulte o ponto de coleta antes da entrega.",
    dicasReutilizacao:
      "Uma lata sem bordas cortantes pode virar um porta-lápis. Se estiver danificada, prefira encaminhar para reciclagem.",
    conteudoEducativo:
      "O alumínio pode ser reciclado várias vezes. A separação ajuda a recuperar esse material e reduz a necessidade de extrair novos recursos.",
  },
  {
    id: "pet",
    nome: "Garrafa PET",
    categoria: "Plástico",
    descricao: "Depois do último gole, uma nova possibilidade.",
    reciclavel: true,
    unidadeDeMedida: "unidade",
    icon: "bottle",
    color: "#E3EFE4",
    instrucoesDescarte:
      "Esvazie, retire os resíduos e deixe secar. Separe de resíduos orgânicos. Confirme como o ponto recebe tampas e rótulos.",
    dicasReutilizacao:
      "Pode virar um vaso para mudas, com furos para a água escoar. Peça ajuda para cortar e não deixe água parada.",
    conteudoEducativo:
      "PET é um tipo de plástico. Nem todos os plásticos têm o mesmo destino: a aceitação depende da estrutura de coleta e reciclagem disponível.",
  },
  {
    id: "papelao",
    nome: "Papelão",
    categoria: "Papel",
    descricao: "Uma caixa pode continuar sua história.",
    reciclavel: true,
    unidadeDeMedida: "kg",
    icon: "box",
    color: "#F4E9D6",
    instrucoesDescarte:
      "Mantenha seco, desmonte as caixas e retire restos de comida. Papelão engordurado ou molhado pode não ser aceito.",
    dicasReutilizacao:
      "Reutilize caixas limpas para organizar objetos, embalar presentes ou criar atividades educativas.",
    conteudoEducativo:
      "A umidade e a gordura dificultam o reaproveitamento das fibras. Guardar papelão em local seco faz diferença.",
  },
  {
    id: "papel",
    nome: "Papel",
    categoria: "Papel",
    descricao: "Separar bem é o primeiro passo.",
    reciclavel: true,
    unidadeDeMedida: "kg",
    icon: "paper",
    color: "#F4E9D6",
    instrucoesDescarte:
      "Separe papéis limpos e secos. Papel higiênico, guardanapos usados e papéis engordurados não devem ir junto.",
    dicasReutilizacao:
      "Use o verso das folhas para rascunhos e pequenos cadernos antes de encaminhar à reciclagem.",
    conteudoEducativo:
      "Papel limpo e seco tem mais chances de ser aproveitado. Papéis plastificados e especiais precisam de orientação específica.",
  },
  {
    id: "vidro",
    nome: "Vidro",
    categoria: "Vidro",
    descricao: "Um material durável que pede cuidado.",
    reciclavel: true,
    unidadeDeMedida: "kg",
    icon: "glass",
    color: "#DDEEF1",
    instrucoesDescarte:
      "Separe garrafas e potes vazios. Embale e identifique cacos para evitar cortes. Confirme a aceitação antes de levar; lâmpadas, espelhos e cerâmica têm outros destinos.",
    dicasReutilizacao:
      "Potes íntegros e limpos podem organizar pequenos objetos. Não reutilize embalagens de produtos químicos para alimentos.",
    conteudoEducativo:
      "Garrafas e potes de vidro podem ser reciclados, mas precisam de uma cadeia de coleta adequada. Reciclável não significa aceito em todos os locais.",
  },
  {
    id: "plastico",
    nome: "Plástico",
    categoria: "Plástico",
    descricao: "Conhecer o tipo ajuda a escolher o destino.",
    reciclavel: true,
    unidadeDeMedida: "kg",
    icon: "bottle",
    color: "#E3EFE4",
    instrucoesDescarte:
      "Retire resíduos e separe embalagens secas. Consulte quais tipos de plástico o ponto aceita.",
    dicasReutilizacao:
      "Use embalagens resistentes para organizar objetos, sem reutilizar recipientes de produtos químicos para alimentos.",
    conteudoEducativo:
      "Existem diferentes resinas plásticas. Filmes, embalagens rígidas e materiais mistos podem ter destinos diferentes.",
  },
  {
    id: "metal",
    nome: "Metal",
    categoria: "Metal",
    descricao: "Recuperar materiais também é cuidar do território.",
    reciclavel: true,
    unidadeDeMedida: "kg",
    icon: "can",
    color: "#DDEEF1",
    instrucoesDescarte:
      "Separe metais limpos. Proteja pontas e bordas. Pilhas, baterias e recipientes pressurizados exigem coleta específica.",
    dicasReutilizacao:
      "Objetos íntegros podem ser reparados e usados novamente. Não corte embalagens pressurizadas.",
    conteudoEducativo:
      "Aço e alumínio são exemplos de metais recicláveis. Cada tipo exige processamento próprio.",
  },
  {
    id: "longa-vida",
    nome: "Embalagem longa vida",
    categoria: "Multicamadas",
    descricao: "Camadas diferentes, um cuidado em comum.",
    reciclavel: true,
    unidadeDeMedida: "unidade",
    icon: "box",
    color: "#F4E9D6",
    instrucoesDescarte:
      "Esvazie, retire resíduos e guarde seca. Verifique se há recebimento de embalagens multicamadas.",
    dicasReutilizacao:
      "Embalagens limpas podem servir em atividades de artesanato, com supervisão ao cortar.",
    conteudoEducativo:
      "Essas embalagens combinam materiais, como papel, plástico e alumínio. Sua reciclagem depende de uma estrutura específica.",
  },
];
export function getMaterial(id: string) {
  return materials.find((material) => material.id === id);
}
export const unitLabel = (unit: Material["unidadeDeMedida"], quantity = 2) =>
  unit === "kg" ? "kg" : quantity === 1 ? "unidade" : "unidades";
