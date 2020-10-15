import React from 'react';

import { useQuery } from '@apollo/client';

import { UsersUsersQuery, UsersUsersQuery_users_edges } from 'types/graphql';

import stripRolePrefix from 'components/stripRolePrefix';
import withPage from 'components/withPage';

import USERS_USERS_QUERY from './queries/users';
import usersPageOptions from './pageOptions';
import { User } from './types';
import Users from './Users';

const UsersIndex: React.FC = () => {
  const { data: usersData } = useQuery<UsersUsersQuery>(USERS_USERS_QUERY);

  const users: User[] =
    usersData?.users?.edges?.map(
      (user: UsersUsersQuery_users_edges | null) =>
        ({
          ...user?.node,
          role: {
            ...user?.node?.role,
            name: stripRolePrefix(user?.node?.role?.name || ''),
          },
        } as User),
    ) || [];

  return <Users users={users} />;
};

export default withPage(usersPageOptions)(UsersIndex);
