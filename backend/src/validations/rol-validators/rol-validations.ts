import { RolRequest } from "@/entities/request/rol-request";
import { injectable } from "inversify";
import { object, string } from "zod";


const CreateRolValidator = object({
    name: string().min(2, { message: "El nombre del rol debe tener al menos 2 caracteres" }),
    description: string().min(5, { message: "La descripción del rol debe tener al menos 5 caracteres" }),
});

const UpdateRolValidator = object({
    id: string().min(1, { message: "El id del rol es obligatorio" }),
    name: string().min(2, { message: "El nombre del rol debe tener al menos 2 caracteres" }).optional(),
    description: string().min(5, { message: "La descripción del rol debe tener al menos 5 caracteres" }).optional(),
});


@injectable()
export class RolValidations {
  create(rol: RolRequest) {
    return CreateRolValidator.safeParse(rol);
  }

  update(rol: RolRequest) {
    return UpdateRolValidator.safeParse(rol);
  }
}