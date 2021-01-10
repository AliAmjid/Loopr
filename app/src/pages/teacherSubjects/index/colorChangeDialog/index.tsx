import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import {
  TeacherSubjectsUpdateColorSubjectMutation,
  TeacherSubjectsUpdateColorSubjectMutationVariables,
} from 'types/graphql';

import TEACHER_SUBJECTS_UPDATE_COLOR_SUBJECT_MUTATION from '../mutations/updateColorSubject';

import ColorChangeDialog from './colorChangeDialog';
import { ColorChangeDialogIndexProps } from './types';

const ColorChangeDialogIndex: React.FC<ColorChangeDialogIndexProps> = props => {
  const [
    updateColorSubject,
    { loading: updateColorSubjectLoading },
  ] = useMutation<
    TeacherSubjectsUpdateColorSubjectMutation,
    TeacherSubjectsUpdateColorSubjectMutationVariables
  >(TEACHER_SUBJECTS_UPDATE_COLOR_SUBJECT_MUTATION, {
    refetchQueries: ['TeacherSubjectsSubjectsQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = (color: string): void => {
    updateColorSubject({
      variables: { input: { id: props.subjectId, teacherCardColor: color } },
    })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });
        props.onClose();
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });
      });
  };

  return (
    <ColorChangeDialog
      open={props.open}
      loading={updateColorSubjectLoading}
      onCancel={props.onClose}
      onSubmit={submitHandler}
    />
  );
};

export default ColorChangeDialogIndex;
