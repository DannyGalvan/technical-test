import { api } from "../configs/axios/interceptors";
import type { ApiResponse } from "../types/ApiResponse";
import type { filterOptions } from "../types/FilterTypes";
import type { UserRequest } from "../types/UserRequest";
import type { UserResponse } from "../types/UserResponse";

export const getUsers = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<UserResponse[]>> => {
  let baseQuery = `Users?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&relations=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<UserResponse[]>>(baseQuery);
};

export const getUserById = async (id: number) => {
  return api.get<unknown, ApiResponse<UserResponse>>(
    `Users/${id}?relations=rol`,
  );
};

export const createUser = async (User: UserRequest) => {
  return api.post<unknown, ApiResponse<UserResponse>, UserRequest>(
    "Users",
    User,
  );
};

export const updateUser = async (User: UserRequest) => {
  return api.put<unknown, ApiResponse<UserResponse>, UserRequest>(
    `Users/${User.id}`,
    User,
  );
};
