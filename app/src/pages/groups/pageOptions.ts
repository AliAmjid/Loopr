import helpPaths from 'config/helpPaths';
import resources from 'config/resources';
import routes from 'config/routes';

import { PageOptions } from 'components/withPage/types';

export const groupsResources: string[][] = [[resources.group.showAll]];

const groupsPageOptions: PageOptions = {
  title: 'groups.index',
  breadcrumbs: [{ label: 'groups.index', href: routes.groups.index }],
  helpPath: helpPaths.groups.index,
  resources: groupsResources,
};

export default groupsPageOptions;
