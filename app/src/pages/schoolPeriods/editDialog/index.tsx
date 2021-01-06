import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

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

  const submitHandler = (values: SubmitValues): void => {
    updateSchoolPeriod({ variables: { input: { id: props.id, ...values } } })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });
        props.onClose();
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });
      });
  };

  return (
    <EditDialogShared
      open={props.open}
      loading={updateSchoolPeriodLoading}
      submitActionLabel="Edit"
      title="Edit"
      defaultValues={props.defaultValues}
      onCancel={props.onClose}
      onSubmit={submitHandler}
    />
  );
};

export default EditDialogIndex;
