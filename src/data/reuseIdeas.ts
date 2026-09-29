import type { IconName } from "../components/ui";
export interface ReuseIdea {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  materials: string[];
  steps: string[];
}
export const reuseIdeas: ReuseIdea[] = [
  {
    id: "vaso-pet",
    title: "Garrafa PET como vaso",
    description: "Uma pequena muda em uma embalagem que já existe em casa.",
    icon: "flower-tulip-outline",
    materials: ["Garrafa PET limpa", "Tesoura", "Terra e muda"],
    steps: [
      "Peça a um adulto para cortar a garrafa e proteger a borda.",
      "Faça furos no fundo para escoar a água.",
      "Coloque a terra e a muda.",
      "Mantenha em local firme. Evite pratos com água parada.",
    ],
  },
  {
    id: "organizador-plastico",
    title: "Organizador de pequenos objetos",
    description: "Dê nova função a uma embalagem resistente e íntegra.",
    icon: "archive-outline",
    materials: ["Embalagem limpa de uso doméstico", "Etiqueta", "Caneta"],
    steps: [
      "Escolha um recipiente íntegro, sem pontas.",
      "Limpe e seque. Não use para alimentos se não for apropriado.",
      "Separe os objetos e identifique o conteúdo.",
    ],
  },
  {
    id: "caixa-organizadora",
    title: "Caixa para organizar materiais",
    description: "Uma caixa seca pode ajudar a manter tudo no lugar.",
    icon: "package-variant",
    materials: [
      "Caixa de papelão limpa",
      "Papel de reaproveitamento",
      "Cola e etiqueta",
    ],
    steps: [
      "Confira se a caixa está seca e firme.",
      "Reforce o fundo e cubra com papel, se desejar.",
      "Identifique o conteúdo.",
      "Guarde em local protegido da umidade.",
    ],
  },
  {
    id: "bloco-rascunho",
    title: "Bloco de rascunhos",
    description: "Use o verso das folhas antes de descartá-las.",
    icon: "notebook-outline",
    materials: ["Folhas usadas de um lado", "Prendedor"],
    steps: [
      "Separe folhas sem informações pessoais que precisem de proteção.",
      "Junte com o lado em branco virado para cima.",
      "Prenda e use para listas e desenhos.",
    ],
  },
  {
    id: "reuso-lata",
    title: "Porta-lápis com lata íntegra",
    description: "Use apenas uma lata sem bordas cortantes.",
    icon: "pencil-box-outline",
    materials: ["Lata limpa e segura", "Papel para revestir", "Cola"],
    steps: [
      "Um adulto deve verificar se não há partes cortantes. Não use uma lata danificada.",
      "Limpe e seque bem.",
      "Revista a parte externa e use para guardar lápis. Se não estiver segura, encaminhe à coleta adequada.",
    ],
  },
  {
    id: "reuso-metal",
    title: "Recipiente para organizar ferramentas",
    description: "Reaproveite um recipiente de metal íntegro, sem cortar.",
    icon: "toolbox-outline",
    materials: ["Recipiente íntegro de metal", "Etiqueta"],
    steps: [
      "Escolha uma peça sem ferrugem solta ou bordas cortantes.",
      "Não corte nem perfure recipientes pressurizados.",
      "Limpe, seque e organize objetos pequenos.",
      "Identifique e mantenha fora do alcance de crianças.",
    ],
  },
  {
    id: "pote-organizador",
    title: "Pote de vidro organizador",
    description: "Um pote inteiro pode guardar pequenos objetos.",
    icon: "glass-wine",
    materials: ["Pote de vidro sem trincas", "Tampa", "Etiqueta"],
    steps: [
      "Verifique se há trincas. Use apenas um pote íntegro.",
      "Lave e seque.",
      "Guarde pequenos objetos e feche a tampa.",
      "Não reutilize embalagens de produtos químicos para alimentos.",
    ],
  },
  {
    id: "porta-lapis",
    title: "Porta-lápis de embalagem",
    description: "Uma ideia simples com embalagem longa vida.",
    icon: "pencil-box-outline",
    materials: ["Embalagem longa vida limpa", "Tesoura", "Papel e cola"],
    steps: [
      "Um adulto deve cortar a parte superior.",
      "Limpe, seque e proteja as bordas.",
      "Revista com papel reaproveitado.",
      "Use para lápis, longe de água e calor.",
    ],
  },
];
