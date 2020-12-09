import namespaces from 'lib/i18n/namespaces';
import materialTableNamespaces from 'lib/material-table/namespaces';

import sideListNamespaces from 'components/SideList/namespaces';
import { PageOptions } from 'components/withPage/types';

const subjectsPageOptions: PageOptions = {
  title: 'subjects.index',
  breadcrumbs: [],
  namespaces: [
    ...materialTableNamespaces,
    ...sideListNamespaces,
    namespaces.pages.subjects.index,
  ],
};

export default subjectsPageOptions;
