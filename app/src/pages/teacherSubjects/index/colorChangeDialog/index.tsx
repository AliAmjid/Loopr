import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';

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
  const { t } = useTranslation(namespaces.pages.teacherSubjects.index);

  const submitHandler = (color: string): void => {
    updateColorSubject({
      variables: { input: { id: props.subjectId, teacherCardColor: color } },
    }).then(() => {
      enqueueSnackbar(t('snackbars.updateColor'), { variant: 'success' });
      props.onClose();
    });
  };

  return (
    <ColorChangeDialog
      open={props.open}
      loading={updateColorSubjectLoading}
      defaultColor={props.defaultColor}
      onCancel={props.onClose}
      onSubmit={submitHandler}
    />
  );
};

export default ColorChangeDialogIndex;
