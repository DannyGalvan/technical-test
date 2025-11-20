import { DocumentStatusResponse } from "./document-status-response";
import { ExpedientItemResponse } from "./expedient-item-response";
import { UserResponse } from "./user-response";


export class ExpedientResponse {
    id: number;
    userId: number
    authorizeUserId?: number;
    description: string;
    documentStatusId: number;
    state: boolean;
    createdAt: string;
    updatedAt?: string;
    documentStatus?: DocumentStatusResponse;
    user: UserResponse;
    authorizeUser?: UserResponse;
    items: ExpedientItemResponse[];
}