import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';
import materialTableNamespaces from 'lib/material-table/namespaces';

import sideListNamespaces from 'components/SideList/namespaces';
import { PageOptions } from 'components/withPage/types';

const classGroupsPageOptions: PageOptions = {
  title: 'classGroups.index',
  breadcrumbs: [{ label: 'classGroups.index', href: routes.classGroups.index }],
  namespaces: [
    ...sideListNamespaces,
    ...materialTableNamespaces,
    namespaces.pages.classGroups.index,
  ],
};

export default classGroupsPageOptions;
