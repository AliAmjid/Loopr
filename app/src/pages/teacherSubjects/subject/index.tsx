import React from 'react';

import withPage from 'components/withPage';

import subjectPageOptions from './pageOptions';
import Subject from './subject';

const SubjectIndex: React.FC = () => {
  return <Subject />;
};

export default withPage(subjectPageOptions)(SubjectIndex);
