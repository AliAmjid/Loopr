import helpPaths from 'config/helpPaths';
import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import notificationsNamespaces from 'components/Notifications/namespaces';
import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

const dashboardBreadcrumbs: Breadcrumbs = [
  { label: 'dashboard.index', href: routes.dashboard.index },
];

const dashboardPageOptions: PageOptions = {
  breadcrumbs: dashboardBreadcrumbs,
  title: 'dashboard.index',
  helpPath: helpPaths.dashboard,
  namespaces: [namespaces.pages.dashboard.index, ...notificationsNamespaces],
};

export default dashboardPageOptions;
