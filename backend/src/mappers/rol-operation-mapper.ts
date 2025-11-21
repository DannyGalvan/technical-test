import { RolOperation } from "@/entities/models/rol-operation";
import { RolOperationRequest } from "@/entities/request/rol-operation-request";
import { RolOperationResponse } from "@/entities/response/rol-operation-response";

export const  RolOperationToResponse = (src?: RolOperation): RolOperationResponse | undefined => {

    if (!src) return undefined; 

    return {
        id: src.id,
        rolId: src.rolId,
        operationId: src.operationId,
        state: src.state,
        createdBy: src.createdBy,
        updatedBy: src.updatedBy,
        createdAt: src.createdAt.toISOString(),
        updatedAt: src.updatedAt?.toISOString(),
    };
}

export const RequestToRolOperation = (src: RolOperationRequest): RolOperation => {
    const rolOperation = new RolOperation();

    rolOperation.id = src.id!;
    rolOperation.rolId = src.rolId!;
    rolOperation.operationId = src.operationId!;
    rolOperation.state = src.state!;
    rolOperation.createdBy = src.createdBy!;
    rolOperation.updatedBy = src.updatedBy!;
    rolOperation.createdAt = new Date();

    return rolOperation;
}