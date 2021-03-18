import { ApolloQueryResult } from '@apollo/client';
import { Query } from 'material-table';

import { UsersUsersQuery } from 'types/graphql';

export interface User {
  id?: string;
  name?: string;
  username?: string;
  createdAt?: string;
  archivedAt?: string;
  archived?: boolean;
  role?: {
    id: string;
    name: string;
  };
}

export interface UsersProps {
  loading: boolean;
  rolesLookup: Record<string, string>;
  classGroupLookup: Record<string, string>;
  getUsers: (query: Query<User>) => Promise<ApolloQueryResult<UsersUsersQuery>>;
}
