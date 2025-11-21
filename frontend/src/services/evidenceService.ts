import { api } from "../configs/axios/interceptors";
import type { ApiResponse } from "../types/ApiResponse";
import type { EvidenceResponse } from "../types/EvidenceResponse";
import type { filterOptions } from "../types/FilterTypes";

export const getEvidences = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<EvidenceResponse[]>> => {
  let baseQuery = `Evidence?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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
