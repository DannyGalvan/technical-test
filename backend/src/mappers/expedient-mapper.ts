import { Expedient } from "@/entities/models/expedient";
import { ExpedientRequest } from "@/entities/request/expedient-request";
import { ExpedientItemToResponse, RequestToExpedientItem } from "./expedient-item-mapper";
import { ExpedientResponse } from "@/entities/response/expedient-response";
import { UserToResponse } from "./user-mappers";
import { DocumentStatusToResponse } from "./document-status-mapper";

export const RequestToExpedient = (src: ExpedientRequest): Expedient => {
    const expedient = new Expedient();

    expedient.id = src.id!;
    expedient.userId = src.userId!;
    expedient.authorizeUserId = src.authorizeUserId;
    expedient.description = src.description;
    expedient.state = src.state ?? true;
    expedient.createdAt = new Date();
    expedient.createdBy = src.createdBy!;
    expedient.updatedBy = src.updatedBy!;
    expedient.documentStatusId = src.documentStatusId ?? 1;
    expedient.expedientItems = src.items?.map(item => RequestToExpedientItem(item))

    return expedient;
}

export const ExpedientToResponse = (src: Expedient): ExpedientResponse => {

    return {
        id: src.id,
        userId: src.userId,
        authorizeUserId: src.authorizeUserId,
        description: src.description,
        state: src.state,
        createdAt: src.createdAt.toLocaleDateString("es-ES", { timeZone: "UTC" }),
        updatedAt: src.updatedAt?.toLocaleDateString("es-ES", { timeZone: "UTC" }),
        documentStatusId: src.documentStatusId,
        user: UserToResponse(src.user),
        authorizeUser: UserToResponse(src.authorizedUser),
        items: src.expedientItems?.map(item => ExpedientItemToResponse(item)) || [],
        documentStatus: DocumentStatusToResponse(src.documentStatus),
    };
}