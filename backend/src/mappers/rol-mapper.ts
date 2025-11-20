import { Rol } from "@/entities/models/rol"
import { RolResponse } from "@/entities/response/rol-response"


export const RolToResponse = (src?: Rol): RolResponse | undefined => {
  
    if (!src) return undefined;

    return {
        id: src.id,
        name: src.name,
        description: src.description,
        createdBy: src.createdBy,
        updatedBy: src.updatedBy,
        createdAt: src.createdAt,
        updatedAt: src.updatedAt
    }
}