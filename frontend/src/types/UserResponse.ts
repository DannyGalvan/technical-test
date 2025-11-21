import type { RolResponse } from "./RolResponse";

export interface UserResponse {
  id: number;
  rolId: number;
  name: string;
  email: string;
  password: string;
  state: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  rol: RolResponse;
}
