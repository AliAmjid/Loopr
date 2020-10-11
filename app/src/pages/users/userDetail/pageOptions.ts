import { usersBreadcrumbs } from 'pages/users/index/pageOptions';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

const usersDetailBreadcrumbs: Breadcrumbs = [
  ...usersBreadcrumbs,
  { label: 'users.userDetail' },
];

const usersDetailPageOptions: PageOptions = {
  title: 'users.userDetail',
  breadcrumbs: usersDetailBreadcrumbs,
};

export default usersDetailPageOptions;
