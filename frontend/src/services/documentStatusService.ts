import { api } from "../configs/axios/interceptors";
import type { ApiResponse } from "../types/ApiResponse";
import type { DocumentStatusResponse } from "../types/DocumentStatusResponse";
import type { filterOptions } from "../types/FilterTypes";

export const getDocumentStatuses = async ({
  pageNumber = 1,
  pageSize = 10,
  filters,
  include,
  includeTotal = false,
}: filterOptions): Promise<ApiResponse<DocumentStatusResponse[]>> => {
  let baseQuery = `document-statuses?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (filters) {
    baseQuery += `&filters=${encodeURIComponent(filters)}`;
  }
  if (include) {
    baseQuery += `&relations=${encodeURIComponent(include)}`;
  }

  if (includeTotal) {
    baseQuery += `&includeTotal=${includeTotal}`;
  }

  return api.get<unknown, ApiResponse<DocumentStatusResponse[]>>(baseQuery);
};
