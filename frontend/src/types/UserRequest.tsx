export interface UserRequest {
  id?: number;
  rolId: number;
  name: string;
  email: string;
  password: string;
  state: boolean;
  createdBy?: number | null;
  updatedBy?: number | null;
}
