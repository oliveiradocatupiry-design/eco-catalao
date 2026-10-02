import { z } from "zod";

const required = z
  .string()
  .trim()
  .min(1, "Preencha este campo.")
  .max(20000, "Use até 20.000 caracteres.");
const text = z.string().trim().max(20000);
const base = {
  id: required,
  name: required.max(160),
  description: required,
  status: z.enum(["active", "inactive"], {
    error: "Selecione Ativo ou Inativo.",
  }),
  updatedAt: z.iso.datetime(),
};
export const wasteTypeSchema = z.object({
  ...base,
  kind: z.literal("types"),
  color: z
    .string()
    .regex(/^#[0-9a-f]{6}$/i, "Use uma cor hexadecimal, como #DFF3E9."),
  icon: z.enum(["recycle", "bottle", "paper", "metal", "glass", "box"]),
});
export const wasteSubtypeSchema = z.object({
  ...base,
  kind: z.literal("subtypes"),
  typeId: required,
  impact: required,
  separation: required,
  disposal: required,
  imageReference: text,
});
export const reuseIdeaSchema = z.object({
  ...base,
  kind: z.literal("ideas"),
  subtypeId: required,
  imageReference: text,
  materials: z.array(required).min(1, "Adicione pelo menos um material."),
  steps: z.array(required).min(1, "Adicione pelo menos um passo."),
});
export const educationSchema = z.object({
  ...base,
  kind: z.literal("education"),
  category: required.max(100),
  content: required,
  subtypeId: text,
});
export const collectionPointSchema = z.object({
  ...base,
  kind: z.literal("points"),
  address: required,
  phone: text,
  hours: text,
  latitude: z
    .number({ error: "Informe uma latitude numérica." })
    .min(-90, "Latitude deve estar entre -90 e 90.")
    .max(90, "Latitude deve estar entre -90 e 90."),
  longitude: z
    .number({ error: "Informe uma longitude numérica." })
    .min(-180, "Longitude deve estar entre -180 e 180.")
    .max(180, "Longitude deve estar entre -180 e 180."),
  materialIds: z.array(required).min(1, "Selecione pelo menos um material."),
  notes: text,
});
export const entitySchema = z.discriminatedUnion("kind", [
  wasteTypeSchema,
  wasteSubtypeSchema,
  reuseIdeaSchema,
  educationSchema,
  collectionPointSchema,
]);
export const databaseSchema = z.object({
  version: z.literal(1),
  records: z.array(entitySchema),
});
export type WasteType = z.infer<typeof wasteTypeSchema>;
export type WasteSubtype = z.infer<typeof wasteSubtypeSchema>;
export type ReuseIdea = z.infer<typeof reuseIdeaSchema>;
export type EducationalContent = z.infer<typeof educationSchema>;
export type CollectionPoint = z.infer<typeof collectionPointSchema>;
export type Entity = z.infer<typeof entitySchema>;
export type Kind = Entity["kind"];
export type Status = Entity["status"];
export type Database = z.infer<typeof databaseSchema>;
export type Draft = Record<string, string | string[]>;
export type FieldErrors = Record<string, string>;
export class ValidationError extends Error {
  constructor(public fields: FieldErrors) {
    super("Revise os campos indicados.");
  }
}
