import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';

import {
  SchoolPeriodsUpdateSchoolPeriodMutation,
  SchoolPeriodsUpdateSchoolPeriodMutationVariables,
} from 'types/graphql';

import EditDialogShared from '../editDialogShared';
import { SubmitValues } from '../editDialogShared/types';
import SCHOOL_PERIODS_UPDATE_SCHOOL_PERIOD_MUTATION from '../mutation/updateSchoolPeriod';

import { EditDialogIndexProps } from './types';

const EditDialogIndex: React.FC<EditDialogIndexProps> = props => {
  const [
    updateSchoolPeriod,
    { loading: updateSchoolPeriodLoading },
  ] = useMutation<
    SchoolPeriodsUpdateSchoolPeriodMutation,
    SchoolPeriodsUpdateSchoolPeriodMutationVariables
  >(SCHOOL_PERIODS_UPDATE_SCHOOL_PERIOD_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.schoolPeriods.index);

  const submitHandler = (values: SubmitValues): void => {
    updateSchoolPeriod({
      variables: { input: { id: props.id, ...values } },
    }).then(() => {
      enqueueSnackbar(t('snackbars.edit.success'), { variant: 'success' });
      props.onClose();
    });
  };

  return (
    <EditDialogShared
      open={props.open}
      loading={updateSchoolPeriodLoading}
      submitActionLabel={t('common:actions.edit')}
      title={t('editDialogTitle')}
      defaultValues={props.defaultValues}
      onCancel={props.onClose}
      onSubmit={submitHandler}
    />
  );
};

export default EditDialogIndex;
