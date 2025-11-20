import { DocumentStatus } from "@/entities/models/document-status"
import { DocumentStatusResponse } from "@/entities/response/document-status-response"

export const DocumentStatusToResponse = (src?: DocumentStatus): DocumentStatusResponse => {

    if (!src) {
        return undefined!;
    }

    return {
        id: src.id,
        name: src.name,
        state: src.state,
    }
}