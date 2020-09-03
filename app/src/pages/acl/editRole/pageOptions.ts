import { aclBreadcrumbs } from 'pages/acl/index/pageOptions';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

const editRoleBreadcrumbs: Breadcrumbs = [
  ...aclBreadcrumbs,
  { label: 'acl.editRole' },
];

const editRolePageOptions: PageOptions = {
  title: 'acl.editRole',
  breadcrumbs: editRoleBreadcrumbs,
};
export default editRolePageOptions;
