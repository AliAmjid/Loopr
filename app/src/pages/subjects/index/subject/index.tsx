import React from 'react';

import useSubjectsState from 'pages/subjects/index/state';

import Subject from './subject';

const SubjectIndex: React.FC = () => {
  const { selectedSubject } = useSubjectsState(state => ({
    selectedSubject: state.selectedSubject,
  }));

  return <Subject selectedSubject={selectedSubject} />;
};
export default SubjectIndex;
