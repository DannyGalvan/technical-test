export interface RolRequest {
  id?: number;
  name: string;
  description: string;
  state: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: number;
}
