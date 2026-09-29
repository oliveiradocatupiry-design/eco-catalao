import type { EducationalContent } from "../types";
export const educationalContent: EducationalContent[] = [
  {
    id: "separar",
    title: "Separar é o primeiro cuidado",
    category: "Reciclagem",
    minutes: 3,
    icon: "recycle",
    color: "#E3EFE4",
    summary: "Um jeito simples de começar, dentro de casa.",
    sections: [
      {
        title: "Comece com dois grupos",
        body: "Separe materiais recicláveis secos dos resíduos orgânicos e dos rejeitos. Papel higiênico e guardanapos usados não devem ir junto com o papel reciclável.",
      },
      {
        title: "Retire os resíduos",
        body: "Esvazie as embalagens e retire restos de alimentos. Quando precisar enxaguar, evite desperdício de água. Deixe secar antes de guardar.",
      },
      {
        title: "Combine o destino",
        body: "Nem todo material reciclável é recebido em todo ponto. Confirme quais materiais são aceitos e guarde tudo em local protegido até a entrega.",
      },
    ],
  },
  {
    id: "rio",
    title: "O cuidado também chega ao rio",
    category: "Território",
    minutes: 2,
    icon: "waves",
    color: "#DDEEF1",
    summary: "Pequenas escolhas conectam casa, comunidade e água.",
    sections: [
      {
        title: "Resíduos não pertencem à água",
        body: "Em um território ligado ao rio, o descarte inadequado pode espalhar resíduos e afetar a vida aquática e o cotidiano das pessoas.",
      },
      {
        title: "Guarde com segurança",
        body: "Use recipientes fechados e protegidos de chuva, vento e animais. Evite deixar embalagens soltas perto da água.",
      },
      {
        title: "Cuidar é uma ação coletiva",
        body: "Compartilhe orientações e combine soluções de coleta com a comunidade. Pontos e horários deste protótipo são exemplos; os locais reais ainda precisam ser validados.",
      },
    ],
  },
  {
    id: "reutilizar",
    title: "Antes de descartar, imagine de novo",
    category: "Reutilização",
    minutes: 3,
    icon: "sprout",
    color: "#F4E9D6",
    summary: "Dar mais tempo de uso também faz diferença.",
    sections: [
      {
        title: "Use o que já existe",
        body: "Uma caixa limpa organiza materiais. O verso de uma folha vira rascunho. Um pote íntegro pode guardar pequenos objetos.",
      },
      {
        title: "Segurança vem primeiro",
        body: "Não reutilize embalagens de produtos químicos para água ou alimentos. Evite bordas cortantes e peça ajuda de um adulto ao cortar materiais.",
      },
      {
        title: "Quando chega a hora de reciclar",
        body: "Se o objeto não puder ser reparado ou reutilizado com segurança, separe pelo material e confirme o destino adequado.",
      },
    ],
  },
  {
    id: "mercado",
    title: "Como funciona o Mercado Verde?",
    category: "Mercado Verde",
    minutes: 2,
    icon: "basket-outline",
    color: "#E3EFE4",
    summary:
      "Conheça a proposta do evento comunitário. Datas e regras ainda precisam de validação.",
    sections: [
      {
        title: "1. Registre o material",
        body: "Selecione manualmente o material e informe a quantidade ou o peso. Os valores em CATS ainda serão definidos pelo projeto.",
      },
      {
        title: "2. Prepare a entrega",
        body: "O registro fica aguardando entrega. Ele não gera saldo confirmado. Locais, horários e taxas reais ainda dependem de validação.",
      },
      {
        title: "3. A confirmação vem depois",
        body: "No sistema futuro, uma pessoa autorizada verificará a entrega. Neste protótipo não há confirmação administrativa, saldo ou resgate.",
      },
    ],
  },
  {
    id: "vidro",
    title: "Vidro: separar sem machucar",
    category: "Descarte",
    minutes: 2,
    icon: "glass-fragile",
    color: "#DDEEF1",
    summary: "Cuidado com quem separa, transporta e recebe.",
    sections: [
      {
        title: "Potes e garrafas",
        body: "Guarde os recipientes vazios de modo estável e confirme se o ponto aceita vidro antes de transportar.",
      },
      {
        title: "Se estiver quebrado",
        body: "Não deixe cacos soltos em sacolas. Use uma embalagem resistente e sinalize claramente que há vidro quebrado, seguindo a orientação da coleta local.",
      },
      {
        title: "Nem tudo é o mesmo vidro",
        body: "Espelhos, lâmpadas e cerâmica não devem ser misturados com garrafas e potes. Procure orientação para o destino específico.",
      },
    ],
  },
];
