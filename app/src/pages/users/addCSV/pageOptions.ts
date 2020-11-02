import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { usersBreadcrumbs } from 'pages/users/index/pageOptions';

import stepperNamespaces from 'components/Stepper/namespaces';
import userImportTableNamespaces from 'components/UserImportTable/namespaces';
import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const addCSVBreadcrumbs: Breadcrumbs = [
  ...usersBreadcrumbs,
  { label: 'users.addCSV', href: routes.users.addCSV },
];

const addCSVNamespaces = [
  namespaces.pages.users.addCSV,
  ...stepperNamespaces,
  ...userImportTableNamespaces,
];

const addCSVPageOptions: PageOptions = {
  title: 'users.addCSV',
  breadcrumbs: addCSVBreadcrumbs,
  namespaces: addCSVNamespaces,
};

export default addCSVPageOptions;
