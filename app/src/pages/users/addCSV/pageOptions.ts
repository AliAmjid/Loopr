import routes from 'config/routes';

import { usersBreadcrumbs } from 'pages/users/index/pageOptions';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const addCSVBreadcrumbs: Breadcrumbs = [
  ...usersBreadcrumbs,
  { label: 'users.addCSV', href: routes.users.addCSV },
];

const addCSVPageOptions: PageOptions = {
  title: 'users.addCSV',
  breadcrumbs: addCSVBreadcrumbs,
};

export default addCSVPageOptions;
