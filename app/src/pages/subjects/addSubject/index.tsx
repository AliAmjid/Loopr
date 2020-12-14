import React from 'react';

import EditSubjectSharedIndex from 'pages/subjects/editSubjectShared';

import withPage from 'components/withPage';

import addSubjectPageOptions from './pageOptions';

const AddSubjectIndex: React.FC = () => {
  return <EditSubjectSharedIndex add />;
};

export default withPage(addSubjectPageOptions)(AddSubjectIndex);
