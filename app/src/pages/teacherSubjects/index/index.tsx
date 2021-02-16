import React, { useState } from 'react';

import { useQuery } from '@apollo/client';

import {
  TeacherSubjectsSubjectsQuery,
  TeacherSubjectsSubjectsQueryVariables,
} from 'types/graphql';

import withPage from 'components/withPage';

import TEACHER_SUBJECTS_SUBJECTS_QUERY from './queries/subjects';
import teacherSubjectsPageOptions from './pageOptions';
import TeacherSubjects from './teacherSubjects';

const TeacherSubjectsIndex: React.FC = () => {
  const [showArchived, setShowArchived] = useState(false);

  const { data: subjectsData, loading: subjectsLoading } = useQuery<
    TeacherSubjectsSubjectsQuery,
    TeacherSubjectsSubjectsQueryVariables
  >(TEACHER_SUBJECTS_SUBJECTS_QUERY, {
    variables: { exists: [{ archivedAt: showArchived }] },
  });

  const subjects = [];
  for (const taughtSubject of subjectsData?.meUser?.taughtSubjects?.edges ||
    []) {
    if (taughtSubject?.node) subjects.push(taughtSubject?.node);
  }

  return (
    <TeacherSubjects
      subjects={subjects}
      loading={subjectsLoading}
      showArchived={showArchived}
      onShowArchivedChange={setShowArchived}
    />
  );
};

export default withPage(teacherSubjectsPageOptions)(TeacherSubjectsIndex);
