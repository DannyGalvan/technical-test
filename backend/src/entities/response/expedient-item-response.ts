import { UserResponse } from "./user-response";


export class ExpedientItemResponse {
    id: number;
    expedientId: number;
    description: string;
    color?: string;
    size?: string;
    weight?: string;
    location?: string;
    userId: number;
    state: boolean;
    createdAt: string;
    updatedAt?: string;

    user: UserResponse;
}