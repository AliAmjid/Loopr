import routes from 'config/routes';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';

const dashboardBreadcrumbs: Breadcrumbs = [
  { label: 'dashboard.index', href: routes.dashboard.index },
];

export default dashboardBreadcrumbs;
