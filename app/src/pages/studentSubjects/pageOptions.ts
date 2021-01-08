import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { PageOptions } from 'components/withPage/types';

const studentSubjectPageOptions: PageOptions = {
  title: 'studentSubjects.index',
  breadcrumbs: [
    { label: 'studentSubjects.index', href: routes.studentSubjects.index },
  ],
  namespaces: [namespaces.pages.studentSubjects.index],
};

export default studentSubjectPageOptions;
