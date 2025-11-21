import { Rol } from "@/entities/models/rol"
import { RolRequest } from "@/entities/request/rol-request";
import { RolResponse } from "@/entities/response/rol-response"


export const RolToResponse = (src?: Rol): RolResponse | undefined => {

    if (!src) return undefined;

    return {
        id: src.id,
        name: src.name,
        description: src.description,
        createdBy: src.createdBy,
        updatedBy: src.updatedBy,
        createdAt: src.createdAt.toLocaleDateString("es-ES", { timeZone: "UTC" }),
        updatedAt: src.updatedAt?.toLocaleDateString("es-ES", { timeZone: "UTC" }),
    }
}

export const RequestToRol = (src: RolRequest): Rol => {
    const rol = new Rol();

    rol.id = src.id!;
    rol.name = src.name!;
    rol.description = src.description!;
    rol.state = src.state!;
    rol.createdBy = src.createdBy!;
    rol.updatedBy = src.updatedBy!;


    return rol;
}