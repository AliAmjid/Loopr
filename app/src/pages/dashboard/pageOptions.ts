import routes from 'config/routes';

import { Breadcrumbs } from 'components/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const dashboardBreadcrumbs: Breadcrumbs = [
  { label: 'dashboard.index', href: routes.dashboard.index },
];

const dashboardPageOptions: PageOptions = {
  breadcrumbs: dashboardBreadcrumbs,
  title: 'dashboard.index',
  helpPath: '/dashboard',
};

export default dashboardPageOptions;
