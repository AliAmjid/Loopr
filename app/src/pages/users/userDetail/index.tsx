import React from 'react';

import { useRouter } from 'next/router';

import withPage from 'components/withPage';

import usersDetailPageOptions from './pageOptions';
import UserDetail from './UserDetail';

const UserDetailIndex: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <UserDetail />
    </>
  );
};

export default withPage(usersDetailPageOptions)(UserDetailIndex);
