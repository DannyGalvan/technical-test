import type { Authorizations } from "./Authorizations";
import type { ValidationFailure } from "./ValidationFailure";

export interface AuthResponse {
  name: string;
  userName: string;
  email: string;
  token: string;
  redirect: string;
  userId: string;
  operations: Authorizations[];
}

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      message: string;
      totalResults: number;
    }
  | {
      success: false;
      data: ValidationFailure[] | null;
      message: string;
      totalResults: number;
    };
