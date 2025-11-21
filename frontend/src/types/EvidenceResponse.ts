import type { DocumentStatusResponse } from "./DocumentStatusResponse";
import type { EvidenceItemResponse } from "./EvidenceItemResponse";
import type { UserResponse } from "./UserResponse";

export interface EvidenceResponse {
  id: number;
  userId: number;
  authorizeUserId: number | null;
  description: string;
  state: boolean;
  createAt: string;
  updateAt: string;
  documentStatusId: number;
  createdAt: string;
  updatedAt: string;
  items?: EvidenceItemResponse[];
  authorizeUser?: UserResponse;
  user?: UserResponse;
  documentStatus?: DocumentStatusResponse;
}
