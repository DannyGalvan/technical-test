

export interface QueryParamsRequest {
  filters?: string;
  relations?: string;
  pageNumber?: number;
  pageSize?:  number;
  includeTotal?: boolean;
}