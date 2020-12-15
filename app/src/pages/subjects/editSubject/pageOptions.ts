import namespaces from 'lib/i18n/namespaces';

import { subjectsBreadcrumbs } from 'pages/subjects/index/pageOptions';

import editSubjectNamespaces from 'components/EditSubject/namespaces';
import { PageOptions } from 'components/withPage/types';

const editSubjectPageOptions: PageOptions = {
  title: 'subjects.editSubject',
  breadcrumbs: [...subjectsBreadcrumbs, { label: 'subjects.editSubject' }],
  namespaces: [...editSubjectNamespaces, namespaces.pages.subjects.editSubject],
};

export default editSubjectPageOptions;
