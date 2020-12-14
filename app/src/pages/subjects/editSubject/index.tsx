import React, { useEffect } from 'react';

import { useApolloClient } from '@apollo/client';
import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';

import SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY from 'pages/subjects/editSubject/queries/subject';
import useEditSubjectState from 'pages/subjects/editSubject/state';
import SummaryIndex from 'pages/subjects/editSubject/summary';

import {
  SubjectsEditSubjectSubjectQuery,
  SubjectsEditSubjectSubjectQueryVariables,
} from 'types/graphql';

import Stepper from 'components/Stepper';
import withPage from 'components/withPage';

import GroupsIndex from './groups';
import editSubjectPageOptions from './pageOptions';
import TeachersIndex from './teachers';

const EditSubjectIndex: React.FC = () => {
  const client = useApolloClient();
  const router = useRouter();
  const {
    group,
    classGroup,
    teacher,
    setGroup,
    setClassGroup,
    setTeacher,
  } = useEditSubjectState(state => ({
    group: state.group,
    classGroup: state.classGroup,
    teacher: state.teacher,
    setGroup: state.setGroup,
    setClassGroup: state.setClassGroup,
    setTeacher: state.setTeacher,
  }));

  useEffect(() => {
    if (router.query.subjectId) {
      client
        .query<
          SubjectsEditSubjectSubjectQuery,
          SubjectsEditSubjectSubjectQueryVariables
        >({
          query: SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY,
          variables: { id: `${router.query.subjectId}` },
        })
        .then(res => {
          const subject = res.data?.subject;
          if (subject) {
            setGroup(subject?.group?.id);
            setClassGroup(subject?.classGroup?.id);
            setTeacher(subject?.teacher?.id);
          }
        });
    }
  }, []);

  return (
    <Paper>
      <Stepper
        steps={[
          {
            index: 0,
            label: 'Group/ClassGroup',
            component: <GroupsIndex />,
            nextActive: group !== undefined || classGroup !== undefined,
          },
          {
            index: 1,
            label: 'Teacher',
            component: <TeachersIndex />,
            nextActive: teacher !== undefined,
          },
          {
            index: 2,
            label: 'Summary',
            component: <SummaryIndex />,
            nextActive: false,
          },
        ]}
      />
    </Paper>
  );
};

export default withPage(editSubjectPageOptions)(EditSubjectIndex);
