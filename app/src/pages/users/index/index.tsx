import React from 'react';

import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { Query } from 'material-table';

import { UsersUsersQuery, UsersUsersQueryVariables } from 'types/graphql';

import usePagination from 'components/usePagination';
import withPage from 'components/withPage';

import USERS_USERS_QUERY from './queries/users';
import usersPageOptions from './pageOptions';
import { User } from './types';
import Users from './Users';

const UsersIndex: React.FC = () => {
  const client = useApolloClient();

  const { getPagination, setPagination } = usePagination();

  const getUsers = (
    query: Query<User>,
  ): Promise<ApolloQueryResult<UsersUsersQuery>> => {
    const paginationVariables = getPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const lastNameFilter =
      query.filters.find(f => f.column.field === 'lastname')?.value || '';

    console.log(query);

    return client
      .query<UsersUsersQuery, UsersUsersQueryVariables>({
        query: USERS_USERS_QUERY,
        variables: {
          ...paginationVariables,
          lastName: lastNameFilter,
        },
      })
      .then(res => {
        const edges = res.data?.users?.edges;
        const totalCount = res.data?.users?.totalCount;
        if (edges && totalCount) {
          setPagination({ edges, totalCount });
        }

        return res;
      });
  };

  return <Users getUsers={getUsers} />;
};

export default withPage(usersPageOptions)(UsersIndex);
