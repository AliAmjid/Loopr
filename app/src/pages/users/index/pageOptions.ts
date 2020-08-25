import routes from 'config/routes';

import materialTableNamespaces from 'lib/material-table/namespaces';

import { Breadcrumbs } from 'components/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const usersBreadcrumbs: Breadcrumbs = [
  { label: 'users.index', href: routes.users.index },
];

export const usersNamespaces = [...materialTableNamespaces];

const usersPageOptions: PageOptions = {
  breadcrumbs: usersBreadcrumbs,
  namespaces: usersNamespaces,
  title: 'users.index',
  helpPath: '/users',
};

export default usersPageOptions;
