import { api } from "../configs/axios/interceptors";
import type { ApiResponse } from "../types/ApiResponse";
import type { filterOptions } from "../types/FilterTypes";
import type { RolRequest } from "../types/RolRequest";
import type { RolResponse } from "../types/RolResponse";

export const getRols = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<RolResponse[]>> => {
  let baseQuery = `Roles?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&relations=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<RolResponse[]>>(baseQuery);
};

export const getRolById = async (id: number) => {
  return api.get<unknown, ApiResponse<RolResponse>>(`Roles/${id}`);
};

export const createRol = async (Rol: RolRequest) => {
  return api.post<unknown, ApiResponse<RolResponse>, RolRequest>("Roles", Rol);
};

export const updateRol = async (Rol: RolRequest) => {
  return api.put<unknown, ApiResponse<RolResponse>, RolRequest>(
    `Roles/${Rol.id}`,
    Rol,
  );
};
