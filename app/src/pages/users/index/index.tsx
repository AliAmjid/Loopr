import React from 'react';

import { compose } from 'recompose';

import withPage from 'components/withPage';

import Users from './users';

const UsersIndex = (): JSX.Element => {
  return <Users />;
};

export default compose(withPage())(UsersIndex);
