import namespaces from 'lib/i18n/namespaces';

import { teacherSubjectsBreadcrumbs } from 'pages/teacherSubjects/index/pageOptions';

import { PageOptions } from 'components/withPage/types';

const subjectPageOptions: PageOptions = {
  title: 'teacherSubjects.subject.index',
  breadcrumbs: [
    ...teacherSubjectsBreadcrumbs,
    { label: 'teacherSubjects.subject.index' },
  ],
  namespaces: [namespaces.pages.teacherSubjects.subject.pointSystem],
};
export default subjectPageOptions;
