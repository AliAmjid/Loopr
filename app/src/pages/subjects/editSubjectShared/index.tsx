import React, { useEffect } from 'react';

import { useApolloClient } from '@apollo/client';
import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';

import SUBJECTS_EDIT_SUBJECT_SUBJECT_QUERY from 'pages/subjects/editSubjectShared/queries/subject';
import useEditSubjectState from 'pages/subjects/editSubjectShared/state';
import SummaryIndex from 'pages/subjects/editSubjectShared/summary';

import {
  SubjectsEditSubjectSubjectQuery,
  SubjectsEditSubjectSubjectQueryVariables,
} from 'types/graphql';

import Stepper from 'components/Stepper';

import GroupsIndex from './groups';
import TeachersIndex from './teachers';
import { EditSubjectSharedIndexProps } from './types';

const EditSubjectSharedIndex: React.FC<EditSubjectSharedIndexProps> = props => {
  const client = useApolloClient();
  const router = useRouter();
  const {
    group,
    classGroup,
    teacher,
    setGroup,
    setClassGroup,
    setTeacher,
    setAdd,
  } = useEditSubjectState(state => ({
    group: state.group,
    classGroup: state.classGroup,
    teacher: state.teacher,
    setGroup: state.setGroup,
    setClassGroup: state.setClassGroup,
    setTeacher: state.setTeacher,
    setAdd: state.setAdd,
  }));

  useEffect(() => {
    if (props.add) {
      setAdd(props.add);
    } else {
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

export default EditSubjectSharedIndex;
