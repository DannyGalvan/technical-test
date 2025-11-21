import { api } from "../configs/axios/interceptors";
import type { ApiResponse } from "../types/ApiResponse";
import type { EvidenceRequest } from "../types/EvidenceRequest";
import type { EvidenceResponse } from "../types/EvidenceResponse";
import type { filterOptions } from "../types/FilterTypes";

export const getEvidences = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<EvidenceResponse[]>> => {
  let baseQuery = `Evidences?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&relations=${encodeURIComponent(include)}`;
  }

  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<EvidenceResponse[]>>(baseQuery);
};

export const getEvidenceById = async (
  id: string,
  include?: string,
): Promise<ApiResponse<EvidenceResponse>> => {
  let baseQuery = `Evidences/${id}`;
  if (include) {
    baseQuery += `?relations=${encodeURIComponent(include)}`;
  }

  return api.get<unknown, ApiResponse<EvidenceResponse>>(baseQuery);
};

export const createEvidence = async (
  data: EvidenceRequest,
): Promise<ApiResponse<EvidenceResponse>> => {
  return api.post<EvidenceRequest, ApiResponse<EvidenceResponse>>(
    "Evidences",
    data,
  );
};

export const authorizeEvidence = async (
  data: EvidenceRequest,
): Promise<ApiResponse<EvidenceResponse>> => {
  return api.put<EvidenceRequest, ApiResponse<EvidenceResponse>>(
    `Evidences/${data.id}`,
    data,
  );
};
