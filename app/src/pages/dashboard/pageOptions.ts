import helpPaths from 'config/helpPaths';
import routes from 'config/routes';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

const dashboardBreadcrumbs: Breadcrumbs = [
  { label: 'dashboard.index', href: routes.dashboard.index },
];

const dashboardPageOptions: PageOptions = {
  breadcrumbs: dashboardBreadcrumbs,
  title: 'dashboard.index',
  helpPath: helpPaths.dashboard,
};

export default dashboardPageOptions;
