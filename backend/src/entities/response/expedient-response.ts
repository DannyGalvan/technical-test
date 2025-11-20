import { ExpedientItemResponse } from "./expedient-item-response";
import { UserResponse } from "./user-response";


export class ExpedientResponse {
    id: number;
    userId: number
    authorizeUserId?: number;
    description: string;
    state: boolean;
    createdAt: string;
    updatedAt?: string;
    user: UserResponse;
    authorizeUser?: UserResponse;
    items: ExpedientItemResponse[];
}