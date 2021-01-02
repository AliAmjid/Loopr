import routes from 'config/routes';

import { Breadcrumbs } from 'components/withPage/Page/AppBar/Breadcrumbs/types';
import { PageOptions } from 'components/withPage/types';

export const teacherSubjectsBreadcrumbs: Breadcrumbs = [
  { label: 'teacherSubjects.index', href: routes.teacherSubjects.index },
];

const teacherSubjectsPageOptions: PageOptions = {
  title: 'teacherSubjects.index',
  breadcrumbs: teacherSubjectsBreadcrumbs,
};

export default teacherSubjectsPageOptions;
