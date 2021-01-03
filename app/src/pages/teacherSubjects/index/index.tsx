import React from 'react';

import { useQuery } from '@apollo/client';

import { TeacherSubjectsSubjectsQuery } from 'types/graphql';

import withPage from 'components/withPage';

import TEACHER_SUBJECTS_SUBJECTS_QUERY from './queries/subjects';
import teacherSubjectsPageOptions from './pageOptions';
import TeacherSubjects from './teacherSubjects';

const TeacherSubjectsIndex: React.FC = () => {
  const { data: subjectsData } = useQuery<TeacherSubjectsSubjectsQuery>(
    TEACHER_SUBJECTS_SUBJECTS_QUERY,
  );

  const subjects = [];
  for (const taughtSubject of subjectsData?.meUser?.taughtSubjects?.edges ||
    []) {
    if (taughtSubject?.node) subjects.push(taughtSubject?.node);
  }

  return <TeacherSubjects subjects={subjects} />;
};

export default withPage(teacherSubjectsPageOptions)(TeacherSubjectsIndex);
