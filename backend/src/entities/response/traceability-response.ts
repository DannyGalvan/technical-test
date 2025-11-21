import { DocumentStatusResponse } from "./document-status-response";
import { UserResponse } from "./user-response";



export class TraceabilityResponse {
    id: number;
    expedientId: number;
    createdUserId: number
    authorizeUserId?: number;
    documentStatusId: number;
    comments: string;
    state: boolean;
    createdAt: string;
    updatedAt?: string;
    createdBy: number;
    updatedBy?: number;

    createdUser: UserResponse;
    authorizedUser?: UserResponse;
    documentStatus: DocumentStatusResponse;
}