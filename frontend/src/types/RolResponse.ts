import type { RolOperationResponse } from "./RolOperationResponse";

export interface RolResponse {
  id: number;
  name: string;
  description: string;
  state: boolean;
  createdAt: string;
  createdBy: number;
  updatedBy?: number;
  updatedAt?: string;
  rolOperations?: RolOperationResponse[];
}
