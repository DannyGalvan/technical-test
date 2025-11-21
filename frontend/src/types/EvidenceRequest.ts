import type { EvidenceItemRequest } from "./EvidenceItemRequest";

export interface EvidenceRequest {
  id?: number;
  userId?: number;
  authorizeUserId?: string | null;
  description?: string;
  comments?: string;
  documentStatusId: number;
  state?: boolean;
  createdBy?: number;
  updatedBy?: number;
  items?: EvidenceItemRequest[];
}
