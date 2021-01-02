import React from 'react';

import withPage from 'components/withPage';

import teacherSubjectsPageOptions from './pageOptions';
import TeacherSubjects from './teacherSubjects';

const TeacherSubjectsIndex: React.FC = () => {
  return <TeacherSubjects />;
};

export default withPage(teacherSubjectsPageOptions)(TeacherSubjectsIndex);
