import { ExpedientItem } from "@/entities/models/expedient-item";
import { ExpedientItemRequest } from "@/entities/request/expedient-item-request";
import { UserToResponse } from "./user-mappers";

export const RequestToExpedientItem = (src: ExpedientItemRequest): ExpedientItem => {
    const expedientItem = new ExpedientItem();

    expedientItem.id = src.id!;
    expedientItem.expedientId = src.expedientId;
    expedientItem.description = src.description;
    expedientItem.color = src.color;
    expedientItem.size = src.size;
    expedientItem.weight = src.weight;
    expedientItem.location = src.location;
    expedientItem.userId = src.userId;
    expedientItem.state = src.state ?? true;
    expedientItem.createdAt = new Date();
    expedientItem.createdBy = src.userId;

    return expedientItem;
}

export const ExpedientItemToResponse = (src?: ExpedientItem): any => {

    if (!src) {
        return undefined!;
    }

    return {
        id: src.id,
        expedientId: src.expedientId,
        description: src.description,
        color: src.color,
        size: src.size,
        weight: src.weight,
        location: src.location,
        userId: src.userId,
        state: src.state,
        createdAt: src.createdAt.toISOString(),
        updatedAt: src.updatedAt?.toISOString(),
        user: UserToResponse(src.user),
    };
}