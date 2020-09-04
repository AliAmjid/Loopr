import React from 'react';

import withPage from 'components/withPage';

import usersDetailPageOptions from './pageOptions';
import UserDetail from './userDetail';

const UserDetailIndex: React.FC = () => {
  return (
    <>
      <UserDetail />
    </>
  );
};

export default withPage(usersDetailPageOptions)(UserDetailIndex);
