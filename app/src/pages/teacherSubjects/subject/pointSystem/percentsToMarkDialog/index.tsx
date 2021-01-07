import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';

import {
  TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert,
  TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvertVariables,
} from 'types/graphql';

import TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_UPDATE_PERCENT_TO_MARK_COVERT from '../mutation/updatePercentToMarkConvert';

import PercentsToMarkDialog from './percentsToMarkDialog';
import { PercentsToMarkDialogIndexProps, PercentsValues } from './types';

const PercentsToMarkDialogIndex: React.FC<PercentsToMarkDialogIndexProps> = props => {
  const [
    updatePercentToMarkConvert,
    { loading: updatePercentToMarkConvertLoading },
  ] = useMutation<
    TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvert,
    TeahcerSubjectsSubjectPointSystemUpdatePercentToMarkConvertVariables
  >(TEACHER_SUBJECTS_SUBJECT_POINT_SYSTEM_UPDATE_PERCENT_TO_MARK_COVERT, {
    refetchQueries: ['TeacherSubjectsSubjectPointSystemSubjectQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  const submitHandler = (values: PercentsValues): void => {
    updatePercentToMarkConvert({
      variables: {
        input: {
          id: props.percentsToMarkConvert.id,
          one: +values.one,
          two: +values.two,
          three: +values.three,
          four: +values.four,
        },
      },
    })
      .then(() => {
        enqueueSnackbar(t('snackbars.updatePercentToMarkConvert.success'), {
          variant: 'success',
        });
        props.onClose();
      })
      .catch(() => {
        enqueueSnackbar(t('snackbars.updatePercentToMarkConvert.error'), {
          variant: 'error',
        });
      });
  };

  const { percentsToMarkConvert } = props;

  return (
    <PercentsToMarkDialog
      open={props.open}
      defaultValues={{
        one: `${percentsToMarkConvert.one}`,
        two: `${percentsToMarkConvert.two}`,
        three: `${percentsToMarkConvert.three}`,
        four: `${percentsToMarkConvert.four}`,
      }}
      loading={updatePercentToMarkConvertLoading}
      onSubmit={submitHandler}
      onCancel={props.onClose}
    />
  );
};

export default PercentsToMarkDialogIndex;
