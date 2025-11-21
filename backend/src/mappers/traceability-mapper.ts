import { Traceability } from "@/entities/models/traceability";
import { TraceabilityResponse } from "@/entities/response/traceability-response";
import { UserToResponse } from "./user-mappers";
import { DocumentStatusToResponse } from "./document-status-mapper";

export const TraceabilityToResponse = (src?: Traceability): TraceabilityResponse  => {

    if (!src) {
        return undefined!;
    }

    return {
        id: src.id!,
        expedientId: src.expedientId,
        createdUserId: src.createdUserId,
        authorizeUserId: src.authorizeUserId,
        documentStatusId: src.documentStatusId,
        comments: src.comments,
        state: src.state,
        createdAt: src.createdAt.toLocaleDateString("es-ES", { timeZone: "UTC" }),
        updatedAt: src.updatedAt?.toLocaleDateString("es-ES", { timeZone: "UTC" }),
        createdBy: src.createdBy,
        updatedBy: src.updatedBy,
        createdUser: UserToResponse(src.createdUser),
        authorizedUser: UserToResponse(src.authorizedUser),
        documentStatus: DocumentStatusToResponse(src.documentStatus)
    }
}