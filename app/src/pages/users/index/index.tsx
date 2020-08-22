import React from 'react';

import { compose } from 'recompose';

import usersBreadcrumbs from 'pages/users/index/breadcrumbs';
import usersNamespaces from 'pages/users/index/namespaces';

import withPage from 'components/withPage';

import Users from './users';

const UsersIndex = (): JSX.Element => {
  return <Users />;
};

export default compose(
  withPage({
    namespaces: usersNamespaces,
    breadcrumbs: usersBreadcrumbs,
    title: 'users.index',
  }),
)(UsersIndex);
