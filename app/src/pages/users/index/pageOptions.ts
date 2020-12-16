import helpPaths from 'config/helpPaths';
import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';
import materialTableNamespaces from 'lib/material-table/namespaces';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const usersBreadcrumbs: Breadcrumbs = [
  { label: 'users.index', href: routes.users.index },
];

const usersNamespaces = [
  namespaces.pages.users.index,
  ...materialTableNamespaces,
];

const usersPageOptions: PageOptions = {
  breadcrumbs: usersBreadcrumbs,
  namespaces: usersNamespaces,
  title: 'users.index',
  helpPath: helpPaths.users.index,
};

export default usersPageOptions;
