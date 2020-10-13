import routes from 'config/routes';

import { usersBreadcrumbs } from 'pages/users/index/pageOptions';

import userImportTableNamespaces from 'components/UserImportTable/namespaces';
import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const addManualBreadcrumbs: Breadcrumbs = [
  ...usersBreadcrumbs,
  { label: 'users.addManual', href: routes.users.addManual },
];

const addManualNamespaces = [...userImportTableNamespaces];

const addManualPageOptions: PageOptions = {
  title: 'users.addManual',
  breadcrumbs: addManualBreadcrumbs,
  namespaces: addManualNamespaces,
};

export default addManualPageOptions;
