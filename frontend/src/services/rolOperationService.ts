import { api } from "../configs/axios/interceptors";
import type { ApiResponse } from "../types/ApiResponse";
import type { filterOptions } from "../types/FilterTypes";
import type { OperationResponse } from "../types/OperationResponse";
import type { RolOperationRequest } from "../types/RolOperationRequest";
import type { RolOperationResponse } from "../types/RolOperationResponse";

export const getRolOperations = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<RolOperationResponse[]>> => {
  let baseQuery = `rol-operations?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&relations=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<RolOperationResponse[]>>(baseQuery);
};

export const getOperations = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<OperationResponse[]>> => {
  let baseQuery = `rol-operations/operations?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&relations=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<OperationResponse[]>>(baseQuery);
};

export const createRolOperation = async (rolOperation: RolOperationRequest) => {
  return api.post<
    unknown,
    ApiResponse<RolOperationResponse>,
    RolOperationRequest
  >("rol-operations", rolOperation);
};

export const updateRolOperation = async (rolOperation: RolOperationRequest) => {
  return api.put<
    unknown,
    ApiResponse<RolOperationResponse>,
    RolOperationRequest
  >(`rol-operations/${rolOperation.id}`, rolOperation);
};
