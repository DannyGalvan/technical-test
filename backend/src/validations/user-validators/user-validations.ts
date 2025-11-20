import { UserRequest } from "@/entities/request/user-request";
import { injectable } from "inversify";
import z from "zod";

const CreateUserValidator = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  rolId: z.number().int().positive({ message: "El rolId debe ser un número entero positivo" }),
});

const UpdateUserValidator = z.object({
  id: z.number().int().positive({ message: "El id debe ser un número entero positivo" }).min(1),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).optional(),
  email: z.string().email({ message: "El correo electrónico no es válido" }).optional(),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).optional(),
  rolId: z.number().int().positive({ message: "El rolId debe ser un número entero positivo" }).optional(),
});

@injectable()
export class UserValidations {
  create(user: UserRequest) {
    return CreateUserValidator.safeParse(user);
  }

  update(user: UserRequest) {
    return UpdateUserValidator.safeParse(user);
  }
}