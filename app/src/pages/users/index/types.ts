import { ApolloQueryResult } from '@apollo/client';
import { Query } from 'material-table';

import { UsersUsersQuery } from 'types/graphql';

export interface User {
  id?: string;
  name?: string;
  username?: string;
  createdAt?: string;
  role?: {
    id: string;
    name: string;
  };
}
export interface UsersProps {
  getUsers: (query: Query<User>) => Promise<ApolloQueryResult<UsersUsersQuery>>;
}
