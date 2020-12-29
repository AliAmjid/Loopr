import React from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import {
  UsersUserDetailUserQuery,
  UsersUserDetailUserQueryVariables,
} from 'types/graphql';

import withPage from 'components/withPage';

import USERS_USER_DETAIL_USER_QUERY from './queries/user';
import usersDetailPageOptions from './pageOptions';
import UserDetail from './UserDetail';

const UserDetailIndex: React.FC = () => {
  const router = useRouter();
  const { data: userData, loading: userLoading } = useQuery<
    UsersUserDetailUserQuery,
    UsersUserDetailUserQueryVariables
  >(USERS_USER_DETAIL_USER_QUERY, {
    variables: { id: router.query.id?.toString() || '' },
  });

  return (
    <UserDetail
      loading={userLoading}
      user={userData?.user}
      roles={userData?.aclRoles}
    />
  );
};

export default withPage(usersDetailPageOptions)(UserDetailIndex);
