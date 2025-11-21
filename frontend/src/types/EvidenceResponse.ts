import type { DocumentStatusResponse } from "./DocumentStatusResponse";
import type { EvidenceItemResponse } from "./EvidenceItemResponse";

export interface EvidenceResponse {
  id: number;
  userId: number;
  authorizeUserId: number | null;
  description: string;
  state: boolean;
  createAt: string;
  updateAt: string;
  documentStatusId: number;
  items: EvidenceItemResponse[];
  documentStatus: DocumentStatusResponse;
}
