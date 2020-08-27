import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const aclBreadcrumbs: Breadcrumbs = [
  { label: 'acl.index', href: routes.acl.index },
];

const aclPageOptions: PageOptions = {
  title: 'acl.index',
  namespaces: [namespaces.pages.acl.index],
  breadcrumbs: aclBreadcrumbs,
};

export default aclPageOptions;
