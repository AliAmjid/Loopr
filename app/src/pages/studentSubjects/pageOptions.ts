import helpPaths from 'config/helpPaths';
import resources from 'config/resources';
import routes from 'config/routes';

import namespaces from 'lib/i18n/namespaces';

import { PageOptions } from 'components/withPage/types';

export const studentSubjectsResources: string[][] = [[resources.user.canStudy]];

const studentSubjectsPageOptions: PageOptions = {
  title: 'studentSubjects.index',
  breadcrumbs: [
    { label: 'studentSubjects.index', href: routes.studentSubjects.index },
  ],
  namespaces: [namespaces.pages.studentSubjects.index],
  helpPath: helpPaths.studentSubjects.index,
  resources: studentSubjectsResources,
};

export default studentSubjectsPageOptions;
