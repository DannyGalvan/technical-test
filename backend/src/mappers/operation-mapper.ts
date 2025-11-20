import { Operation } from "@/entities/models/operation";
import { OperationResponse } from "@/entities/response/operation-response";


export const OperationToResponse = (src?: Operation): OperationResponse | undefined => {

    if (!src) return undefined;

    return {
        id: src.id,
        name: src.name,
        description: src.description,
        path: src.path,
        icon: src.icon,
        guid: src.guid,
        policy: src.policy,
        isVisible: src.isVisible
    }
}