import { useState } from 'react';

import {
  GetPaginationArgs,
  PaginationVariables,
  SetPaginationArgs,
  UsePaginationReturn,
} from './types';

const usePagination = (): UsePaginationReturn => {
  const [state, setState] = useState({
    page: 0,
    firstCursor: '',
    lastCursor: '',
    totalCount: 0,
  });

  const getPagination = (args: GetPaginationArgs): PaginationVariables => {
    const variables: PaginationVariables = {};
    if (args.page === state.page + 1 || args.page === state.page) {
      variables.first = args.pageSize;
      if (args.page > 0) variables.after = state.lastCursor;
    }

    if (args.page === state.page - 1 || args.page > state.page + 1) {
      variables.last = state.totalCount % args.pageSize;
      if (args.page === state.page - 1) variables.before = state.firstCursor;
    }

    setState(prevState => ({ ...prevState, page: args.page }));

    return variables;
  };

  const setPagination = ({ edges, totalCount }: SetPaginationArgs): void => {
    const lastCursor = edges[edges.length - 1]?.cursor;
    const firstCursor = edges[0]?.cursor;

    if (lastCursor && firstCursor) {
      setState(prevState => ({
        ...prevState,
        lastCursor,
        firstCursor,
        totalCount,
      }));
    }
  };

  return { getPagination, setPagination };
};

export default usePagination;
