import { Expedient } from "@/entities/models/expedient";
import { ExpedientRequest } from "@/entities/request/expedient-request";
import { ExpedientItemToResponse, RequestToExpedientItem } from "./expedient-item-mapper";
import { ExpedientResponse } from "@/entities/response/expedient-response";
import { UserToResponse } from "./user-mappers";

export const RequestToExpedient = (src: ExpedientRequest): Expedient => {
    const expedient = new Expedient();

    expedient.id = src.id!;
    expedient.userId = src.userId;
    expedient.authorizeUserId = src.authorizeUserId;
    expedient.description = src.description;
    expedient.state = src.state ?? true;
    expedient.createdAt = new Date();
    expedient.createdBy = src.userId;
    expedient.expedientItems = src.items?.map(item => RequestToExpedientItem(item)) || [];

    return expedient;
}

export const ExpedientToResponse = (src: Expedient): ExpedientResponse => {

    return {
        id: src.id,
        userId: src.userId,
        authorizeUserId: src.authorizeUserId,
        description: src.description,
        state: src.state,
        createdAt: src.createdAt.toISOString(),
        updatedAt: src.updatedAt?.toISOString(),
        user: UserToResponse(src.user),
        authorizeUser: UserToResponse(src.authorizedUser),
        items: src.expedientItems?.map(item => ExpedientItemToResponse(item)) || [],
    };
}