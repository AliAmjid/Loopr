import namespaces from 'lib/i18n/namespaces';

import sideListNamespaces from 'components/SideList/namespaces';
import { PageOptions } from 'components/withPage/types';

const classGroupsPageOptions: PageOptions = {
  title: 'Classes',
  breadcrumbs: [],
  namespaces: [...sideListNamespaces, namespaces.pages.classGroups.index],
};

export default classGroupsPageOptions;
