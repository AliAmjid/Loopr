import routes from 'config/routes';

import { PageOptions } from 'components/withPage/types';

const groupsPageOptions: PageOptions = {
  title: 'groups.index',
  breadcrumbs: [{ label: 'groups.index', href: routes.groups.index }],
};

export default groupsPageOptions;
