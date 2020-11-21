import resources from 'config/resources';
import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';
import materialTableNamespaces from 'lib/material-table/namespaces';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const aclBreadcrumbs: Breadcrumbs = [
  { label: 'acl.index', href: routes.acl.index },
];

const aclPageNamespaces = [
  namespaces.pages.acl.index,
  ...materialTableNamespaces,
];

const aclPageResources = [[resources.role.edit], [resources.role.createRole]];

const aclPageOptions: PageOptions = {
  title: 'acl.index',
  namespaces: aclPageNamespaces,
  breadcrumbs: aclBreadcrumbs,
  resources: aclPageResources,
};

export default aclPageOptions;
