import helpPaths from 'config/helpPaths';
import routes from 'config/routes';

import { PageOptions } from 'components/withPage/types';

const groupsPageOptions: PageOptions = {
  title: 'groups.index',
  breadcrumbs: [{ label: 'groups.index', href: routes.groups.index }],
  helpPath: helpPaths.groups.index,
};

export default groupsPageOptions;
