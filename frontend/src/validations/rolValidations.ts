import { object, string } from "zod";
import type { RolRequest } from "../types/RolRequest";
import { handleOneLevelZodError } from "../utils/converted";

const rolSchema = object({
  name: string().min(1, "El nombre es obligatorio"),
  description: string().min(1, "La descripción es obligatoria"),
});

export const rolValidations = (form: RolRequest) => {
  let errors: Partial<Record<keyof RolRequest, string>> = {};

  const parse = rolSchema.safeParse(form);

  if (!parse.success) {
    errors = handleOneLevelZodError(parse.error);
  }

  return errors;
};
