import type { Draft, Entity, Kind } from "../types/catalog";
export type FieldSpec = {
  key: string;
  label: string;
  type?: "textarea" | "select" | "color" | "list" | "checks";
  required?: boolean;
  options?: { value: string; label: string }[];
  source?: Kind;
  hint?: string;
  wide?: boolean;
};
export type ModuleSpec = {
  kind: Kind;
  path: string;
  title: string;
  singular: string;
  create: string;
  newRoute: string;
  description: string;
  fields: FieldSpec[];
  relation?: { key: string; kind: Kind; label: string };
};
const name: FieldSpec = { key: "name", label: "Nome", required: true };
const description: FieldSpec = {
  key: "description",
  label: "Descrição",
  type: "textarea",
  required: true,
  wide: true,
};
const status: FieldSpec = {
  key: "status",
  label: "Status",
  type: "select",
  options: [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ],
  required: true,
};
const reference: FieldSpec = {
  key: "imageReference",
  label: "Referência visual (opcional)",
  hint: "Descrição da ilustração ou endereço de uma imagem autorizada. Não há upload nesta versão.",
  wide: true,
};
export const modules: ModuleSpec[] = [
  {
    kind: "types",
    path: "residuos/tipos",
    title: "Tipos de resíduos",
    singular: "Tipo de resíduo",
    create: "Adicionar tipo",
    newRoute: "novo",
    description: "Organize os grupos que orientam a separação dos materiais.",
    fields: [
      name,
      { key: "color", label: "Cor associada", type: "color", required: true },
      {
        key: "icon",
        label: "Representação",
        type: "select",
        required: true,
        options: [
          { value: "recycle", label: "Reciclagem" },
          { value: "bottle", label: "Garrafa" },
          { value: "paper", label: "Papel" },
          { value: "metal", label: "Metal" },
          { value: "glass", label: "Vidro" },
          { value: "box", label: "Embalagem" },
        ],
      },
      status,
      description,
    ],
  },
  {
    kind: "subtypes",
    path: "residuos/subtipos",
    title: "Subtipos de resíduos",
    singular: "Subtipo de resíduo",
    create: "Adicionar subtipo",
    newRoute: "novo",
    description:
      "Mantenha as orientações de separação, impacto e descarte de cada material.",
    relation: { key: "typeId", kind: "types", label: "Tipo" },
    fields: [
      name,
      {
        key: "typeId",
        label: "Tipo associado",
        type: "select",
        source: "types",
        required: true,
      },
      { ...description, label: "Informações gerais" },
      {
        key: "impact",
        label: "Impacto ambiental",
        type: "textarea",
        required: true,
        wide: true,
      },
      {
        key: "separation",
        label: "Como separar",
        type: "textarea",
        required: true,
        wide: true,
      },
      {
        key: "disposal",
        label: "Como descartar",
        type: "textarea",
        required: true,
        wide: true,
      },
      reference,
      status,
    ],
  },
  {
    kind: "ideas",
    path: "reutilizacao",
    title: "Ideias de reutilização",
    singular: "Ideia de reutilização",
    create: "Nova ideia",
    newRoute: "nova",
    description:
      "Dê mais tempo de uso aos materiais com ideias simples e seguras.",
    relation: { key: "subtypeId", kind: "subtypes", label: "Subtipo" },
    fields: [
      { ...name, label: "Título" },
      {
        key: "subtypeId",
        label: "Subtipo associado",
        type: "select",
        source: "subtypes",
        required: true,
      },
      description,
      reference,
      {
        key: "materials",
        label: "Materiais necessários",
        type: "list",
        required: true,
        wide: true,
      },
      {
        key: "steps",
        label: "Passo a passo",
        type: "list",
        required: true,
        wide: true,
      },
      status,
    ],
  },
  {
    kind: "education",
    path: "educacao",
    title: "Educação ambiental",
    singular: "Conteúdo educativo",
    create: "Novo conteúdo",
    newRoute: "novo",
    description:
      "Informações úteis para o cuidado com a casa, a comunidade e o rio.",
    fields: [
      { ...name, label: "Título" },
      { key: "category", label: "Categoria", required: true },
      { ...description, label: "Resumo" },
      {
        key: "content",
        label: "Conteúdo",
        type: "textarea",
        required: true,
        wide: true,
      },
      {
        key: "subtypeId",
        label: "Material relacionado (opcional)",
        type: "select",
        source: "subtypes",
      },
      status,
    ],
  },
  {
    kind: "points",
    path: "pontos-coleta",
    title: "Pontos de coleta",
    singular: "Ponto de coleta",
    create: "Novo ponto",
    newRoute: "novo",
    description:
      "Organize as informações dos locais de recebimento demonstrativos.",
    fields: [
      name,
      status,
      description,
      {
        key: "address",
        label: "Endereço ou referência",
        required: true,
        wide: true,
      },
      {
        key: "latitude",
        label: "Latitude",
        required: true,
        hint: "De -90 a 90. Aceita vírgula ou ponto decimal.",
      },
      {
        key: "longitude",
        label: "Longitude",
        required: true,
        hint: "De -180 a 180. Aceita vírgula ou ponto decimal.",
      },
      {
        key: "phone",
        label: "Telefone (opcional)",
        hint: "Deixe vazio quando não informado.",
      },
      {
        key: "hours",
        label: "Horário (opcional)",
        hint: "Deixe vazio quando ainda não validado.",
      },
      {
        key: "materialIds",
        label: "Materiais aceitos",
        type: "checks",
        source: "subtypes",
        required: true,
        wide: true,
      },
      { key: "notes", label: "Observações", type: "textarea", wide: true },
    ],
  },
];
export const moduleFor = (kind: Kind) => modules.find((m) => m.kind === kind)!;
export const moduleUrl = (spec: ModuleSpec) => `/admin/${spec.path}`;
export function emptyDraft(spec: ModuleSpec): Draft {
  const fields: Draft = Object.fromEntries(
    spec.fields.map((f) => [
      f.key,
      f.type === "list" ? [""] : f.type === "checks" ? [] : "",
    ]),
  );
  return {
    ...fields,
    status: "active",
    ...(spec.kind === "types" ? { color: "#DFF3E9", icon: "recycle" } : {}),
  };
}
export function relatedLabel(entity: Entity, records: Entity[]): string {
  if (entity.kind === "types")
    return `${records.filter((r) => r.kind === "subtypes" && r.typeId === entity.id).length} subtipos associados`;
  if (entity.kind === "subtypes")
    return (
      records.find((r) => r.kind === "types" && r.id === entity.typeId)?.name ??
      "Tipo não encontrado"
    );
  if (entity.kind === "ideas")
    return (
      records.find((r) => r.kind === "subtypes" && r.id === entity.subtypeId)
        ?.name ?? "Subtipo não encontrado"
    );
  if (entity.kind === "education") return entity.category;
  return `${entity.materialIds.length} materiais · a validar`;
}
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
