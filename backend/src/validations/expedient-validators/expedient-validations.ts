import { ExpedientRequest } from "@/entities/request/expedient-request";
import { array, number, object, string } from "zod";

const ExpedientItemValidator = object({
    expedientId: number().int().positive({ message: "El expediente debe ser un número entero positivo" }),
    description: string().min(1, { message: "La descripción no puede estar vacía" }),
    color: string().min(1, { message: "El color no puede estar vacío" }),
    size: number().positive({ message: "El tamaño debe ser un número positivo" }),
    weight: number().positive({ message: "El peso debe ser un número positivo" }),
    location: string().min(1, { message: "La ubicación no puede estar vacía" }),
    userId: number().int().positive({ message: "El usuario debe ser un número entero positivo" }),
    state: number().int().positive({ message: "El estado debe ser un número entero positivo" }).optional(),
});


const CreateExpedientValidator = object({
    userId: number().int().positive({ message: "El usuario debe ser un número entero positivo" }),
    description: string().min(1, { message: "La descripción no puede estar vacía" }),
    state: number().int().positive({ message: "El estado debe ser un número entero positivo" }).optional(),
    items: array(ExpedientItemValidator, { message: "El expediente debe contener al menos un ítem" })
        .nonempty({ message: "El expediente debe contener al menos un ítem" })
        .min(1, { message: "El expediente debe contener al menos un ítem" }),
});

const UpdateExpedientValidator = object({
    id: number().int().positive({ message: "El ID debe ser un número entero positivo" }).min(1, { message: "El ID debe ser al menos 1" }),
    userId: number().int().positive({ message: "El usuario debe ser un número entero positivo" }),
    authorizeUserId: number().int().positive({ message: "El usuario autorizado debe ser un número entero positivo" }).optional(),
    description: string().min(1, { message: "La descripción no puede estar vacía" }),
    state: number().int().positive({ message: "El estado debe ser un número entero positivo" }).optional(),
});


export class ExpedientValidations {
    create(expedient: ExpedientRequest) {
        return CreateExpedientValidator.safeParse(expedient);
    }

    update(expedient: ExpedientRequest) {
        return UpdateExpedientValidator.safeParse(expedient);
    }
}
