import namespaces from 'lib/i18n/namespaces';

import sideListNamespaces from 'components/SideList/namespaces';
import { PageOptions } from 'components/withPage/types';

const classGroupsPageOptions: PageOptions = {
  title: 'classGroups.index',
  breadcrumbs: [],
  // TODO add namespace but
  namespaces: [...sideListNamespaces],
};

export default classGroupsPageOptions;
