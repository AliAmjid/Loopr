import helpPaths from 'config/helpPaths';
import resources from 'config/resources';
import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const teacherSubjectsBreadcrumbs: Breadcrumbs = [
  { label: 'teacherSubjects.index', href: routes.teacherSubjects.index },
];

export const teacherSubjectsResources: string[][] = [
  [resources.subject.teacher],
];

const teacherSubjectsPageOptions: PageOptions = {
  title: 'teacherSubjects.index',
  breadcrumbs: teacherSubjectsBreadcrumbs,
  namespaces: [namespaces.pages.teacherSubjects.index],
  helpPath: helpPaths.teacherSubjects.index,
  resources: teacherSubjectsResources,
};

export default teacherSubjectsPageOptions;
