import routes from 'config/routes';

import { PageOptions } from 'components/withPage/types';

const studentSubjectPageOptions: PageOptions = {
  title: 'studentSubjects.index',
  breadcrumbs: [
    { label: 'studentSubjects.index', href: routes.studentSubjects.index },
  ],
};

export default studentSubjectPageOptions;
