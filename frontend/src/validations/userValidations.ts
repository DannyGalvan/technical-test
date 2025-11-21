import { number, object, string, union } from "zod";
import type { UserRequest } from "../types/UserRequest";
import { handleOneLevelZodError } from "../utils/converted";

const userShema = object({
  name: string().min(1, "El nombre es obligatorio"),
  email: string().email("El correo no es válido"),
  password: string().min(1, "La contraseña es obligatoria"),
  rolId: union(
    [
      string().min(1, "El rol es obligatorio"),
      number().min(1, "El rol es obligatorio"),
    ],
    { message: "El rol es obligatorio" },
  ),
});

export const userValidations = (form: UserRequest) => {
  let errors: Partial<Record<keyof UserRequest, string>> = {};

  const parse = userShema.safeParse(form);

  if (!parse.success) {
    errors = handleOneLevelZodError(parse.error);
  }

  return errors;
};
