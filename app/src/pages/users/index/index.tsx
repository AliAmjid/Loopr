import React from 'react';

import { compose } from 'recompose';

import withPage from 'components/withPage';

import usersPageOptions from './pageOptions';
import Users from './users';

const UsersIndex: React.FC = () => {
  return <Users />;
};

export default compose(withPage(usersPageOptions))(UsersIndex);
