import type { DocumentStatusResponse } from "./DocumentStatusResponse";
import type { EvidenceResponse } from "./EvidenceResponse";
import type { UserResponse } from "./UserResponse";

export interface RequestTraceabilityResponse {
  id: number;
  expedientId: string;
  createdUserId: number;
  authorizedUserId: number;
  documentStatusId: number;
  comments: string;
  state: number;
  createdBy: number;
  updatedBy?: number;
  createdAt: string;
  updatedAt?: string;
  expedient?: EvidenceResponse;
  createdUser?: UserResponse;
  authorizedUser?: UserResponse;
  documentStatus?: DocumentStatusResponse;
}
