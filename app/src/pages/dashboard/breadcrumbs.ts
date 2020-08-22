import routes from 'config/routes';

import { Breadcrumbs } from 'components/Breadcrumbs/types';

const dashboardBreadcrumbs: Breadcrumbs = [
  { label: 'dashboard.index', href: routes.dashboard.index },
];

export default dashboardBreadcrumbs;
