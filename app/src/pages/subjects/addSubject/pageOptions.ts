import namespaces from 'lib/i18n/namespaces';

import { subjectsBreadcrumbs } from 'pages/subjects/index/pageOptions';

import editSubjectNamespaces from 'components/EditSubject/namespaces';
import { PageOptions } from 'components/withPage/types';

const editSubjectPageOptions: PageOptions = {
  title: 'subjects.addSubject',
  breadcrumbs: [...subjectsBreadcrumbs, { label: 'subjects.addSubject' }],
  namespaces: [...editSubjectNamespaces, namespaces.pages.subjects.addSubject],
};

export default editSubjectPageOptions;
