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
  let baseQuery = `Rol?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&include=${encodeURIComponent(include)}`;
  }
  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<RolResponse[]>>(baseQuery);
};

export const getRolById = async (id: number) => {
  return api.get<unknown, ApiResponse<RolResponse>>(`Rol/${id}`);
};

export const getRolByApplicantRequisition = async (
  applicantRequisitionId: number,
) => {
  const request = await api.get<unknown, ApiResponse<RolResponse[]>>(
    `Rol?Filters=JobRequisitionApplicantId:eq:${applicantRequisitionId}&PageNumber=1&PageSize=30&IncludeTotal=false`,
  );

  if (!request.success) {
    return null;
  }

  if (request.data.length == 0) {
    return null;
  }

  return request.data[0];
};

export const createRol = async (Rol: RolRequest) => {
  return api.post<unknown, ApiResponse<RolResponse>, RolRequest>("Rol", Rol);
};

export const updateRol = async (Rol: RolRequest) => {
  return api.put<unknown, ApiResponse<RolResponse>, RolRequest>(`Rol`, Rol);
};
