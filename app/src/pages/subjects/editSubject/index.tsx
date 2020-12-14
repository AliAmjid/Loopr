import React from 'react';

import EditSubjectSharedIndex from 'pages/subjects/editSubjectShared';

import withPage from 'components/withPage';

import editSubjectPageOptions from './pageOptions';

const EditSubjectIndex: React.FC = () => {
  return <EditSubjectSharedIndex />;
};

export default withPage(editSubjectPageOptions)(EditSubjectIndex);
