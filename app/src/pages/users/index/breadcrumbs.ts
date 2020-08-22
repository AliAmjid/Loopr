import routes from 'config/routes';

import { Breadcrumbs } from 'components/Breadcrumbs/types';

const usersBreadcrumbs: Breadcrumbs = [
  { label: 'users.index', href: routes.users.index },
];

export default usersBreadcrumbs;
