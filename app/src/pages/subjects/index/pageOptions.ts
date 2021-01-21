import helpPaths from 'config/helpPaths';
import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';
import materialTableNamespaces from 'lib/material-table/namespaces';

import sideListNamespaces from 'components/SideList/namespaces';
import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const subjectsBreadcrumbs: Breadcrumbs = [
  { label: 'subjects.index', href: routes.subjects.index },
];

const subjectsPageOptions: PageOptions = {
  title: 'subjects.index',
  breadcrumbs: subjectsBreadcrumbs,
  namespaces: [
    ...materialTableNamespaces,
    ...sideListNamespaces,
    namespaces.pages.subjects.index,
  ],
  helpPath: helpPaths.subjects.index,
};

export default subjectsPageOptions;
