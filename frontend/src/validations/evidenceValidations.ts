import { array, number, object, string, union } from "zod";
import { schemaEvidenceItem } from "./evidenceItemValidations";

export const evidenceSchema = object({
  description: string({
    invalid_type_error: "La descripción es requerida",
  }).min(1, "La descripción es requerida"),
  documentStatusId: union([
    number({ invalid_type_error: "El estado es requerido" }).min(
      1,
      "El estado es requerido",
    ),
    string({ invalid_type_error: "El estado es requerido" }).min(
      1,
      "El estado es requerido",
    ),
  ]),
  items: array(schemaEvidenceItem, {
    invalid_type_error: "Se requiere al menos un ítem de evidencia",
  }).min(1, "Se requiere al menos un ítem de evidencia"),
});
