import { boolean, number, object, string, union } from "zod";
import type { EvidenceItemRequest } from "../types/EvidenceItemRequest";
import { handleOneLevelZodError } from "../utils/converted";

export const schemaEvidenceItem = object({
  description: string({
    invalid_type_error: "La descripción es requerida",
  }).min(1, "La descripción es requerida"),
  color: string({ invalid_type_error: "El color es requerido" }).min(
    1,
    "El color es requerido",
  ),
  size: string({ invalid_type_error: "El tamaño es requerido" }).min(
    1,
    "El tamaño es requerido",
  ),
  weight: union([
    number({ invalid_type_error: "El peso es requerido" }).min(
      1,
      "El peso es requerido",
    ),
    string({ invalid_type_error: "El peso es requerido" }).min(
      1,
      "El peso es requerido",
    ),
  ]),
  location: string({ invalid_type_error: "La ubicación es requerida" }).min(
    1,
    "La ubicación es requerida",
  ),
  state: boolean({ invalid_type_error: "El estado es requerido" }),
});

export const validateEvidenceItem = (item: EvidenceItemRequest) => {
  let errors: Partial<Record<keyof EvidenceItemRequest, string>> = {};
  const parseResult = schemaEvidenceItem.safeParse(item);

  if (!parseResult.success) {
    errors = handleOneLevelZodError(parseResult.error);
  }

  return errors;
};
