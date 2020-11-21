import React, { useState } from 'react';

import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { Query } from 'material-table';

import { UsersUsersQuery, UsersUsersQueryVariables } from 'types/graphql';

import withPage from 'components/withPage';

import USERS_USERS_QUERY from './queries/users';
import usersPageOptions from './pageOptions';
import { User } from './types';
import Users from './Users';

const UsersIndex: React.FC = () => {
  const client = useApolloClient();

  const [pagination, setPagination] = useState({
    page: 0,
    firstCursor: '',
    lastCursor: '',
  });
  const getUsers = (
    query: Query<User>,
  ): Promise<ApolloQueryResult<UsersUsersQuery>> => {
    const variables: UsersUsersQueryVariables = {};

    if (query.page > pagination.page || pagination.page === 0) {
      variables.first = query.pageSize;
      if (query.page > 0) variables.after = pagination.lastCursor;
    }

    if (query.page < pagination.page) {
      variables.last = query.pageSize;
      variables.before = pagination.firstCursor;
    }

    return client
      .query<UsersUsersQuery, UsersUsersQueryVariables>({
        query: USERS_USERS_QUERY,
        variables,
        fetchPolicy: 'no-cache',
      })
      .then(res => {
        const edges = res.data?.users?.edges;
        if (edges !== null && edges !== undefined) {
          const lastCursor = edges[edges.length - 1]?.cursor;
          const firstCursor = edges[0]?.cursor;

          if (lastCursor && firstCursor) {
            setPagination({
              page: query.page,
              lastCursor,
              firstCursor,
            });
          }
        }

        return res;
      });
  };

  return <Users getUsers={getUsers} />;
};

export default withPage(usersPageOptions)(UsersIndex);
