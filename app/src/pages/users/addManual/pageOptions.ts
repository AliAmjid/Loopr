import routes from 'config/routes';

import { usersBreadcrumbs } from 'pages/users/index/pageOptions';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const addManualBreadcrumbs: Breadcrumbs = [
  ...usersBreadcrumbs,
  { label: 'users.addManual', href: routes.users.addManual },
];

const addManualPageOptions: PageOptions = {
  title: 'users.addManual',
  breadcrumbs: addManualBreadcrumbs,
};

export default addManualPageOptions;
