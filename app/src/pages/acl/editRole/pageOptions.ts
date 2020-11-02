import namespaces from 'lib/i18n/namespaces';

import { aclBreadcrumbs } from 'pages/acl/index/pageOptions';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

const editRoleBreadcrumbs: Breadcrumbs = [
  ...aclBreadcrumbs,
  { label: 'acl.editRole' },
];

const editRoleNamespaces = [namespaces.pages.acl.editRole];

const editRolePageOptions: PageOptions = {
  title: 'acl.editRole',
  breadcrumbs: editRoleBreadcrumbs,
  namespaces: editRoleNamespaces,
};
export default editRolePageOptions;
