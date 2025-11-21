import { RolOperationRequest } from "@/entities/request/rol-operation-request";
import { injectable } from "inversify";
import { boolean, number, object } from "zod";



const CreateRolOperationValidator = object({
    rolId: number().min(1, { message: "El id del rol es obligatorio" }),
    operationId: number().min(1, { message: "El id de la operación es obligatorio" }),
    state: number({ error: "El estado es obligatorio" }),
});

const UpdateRolOperationValidator = object({
    id: number().min(1, { message: "El id del rol de operación es obligatorio" }),
    rolId: number().min(1, { message: "El id del rol es obligatorio" }).optional(),
    operationId: number().min(1, { message: "El id de la operación es obligatorio" }).optional(),
    state: number({ error: "El estado es obligatorio" }).optional(),
});

@injectable()
export class RolOperationValidations {
    create(rolOperation: RolOperationRequest) {
        return CreateRolOperationValidator.safeParse(rolOperation);
    }

    update(rolOperation: RolOperationRequest) {
        return UpdateRolOperationValidator.safeParse(rolOperation);
    }
}