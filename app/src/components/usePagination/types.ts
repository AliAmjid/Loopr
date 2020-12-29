export interface PaginationVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}

export interface GetPaginationArgs {
  page: number;
  pageSize: number;
}

export interface SetPaginationArgs {
  edges: ({ cursor?: string | null } | null)[];
  totalCount: number;
}

export interface UsePaginationReturn {
  getPagination: (args: GetPaginationArgs) => PaginationVariables;
  setPagination: (args: SetPaginationArgs) => void;
  resetPagination: () => void;
}
