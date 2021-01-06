import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import EditDialogShared from 'pages/schoolPeriods/editDialogShared';

import {
  SchoolPeriodsCreateSchoolPeriodMutation,
  SchoolPeriodsCreateSchoolPeriodMutationVariables,
} from 'types/graphql';

import { SubmitValues } from '../editDialogShared/types';
import SCHOOL_PERIODS_CREATE_SCHOOL_PERIOD_MUTATION from '../mutation/creteSchoolPeriod';

import { AddDialogIndexProps } from './types';

const AddDialogIndex: React.FC<AddDialogIndexProps> = props => {
  const [
    createSchoolPeriod,
    { loading: createSchoolPeriodLoading },
  ] = useMutation<
    SchoolPeriodsCreateSchoolPeriodMutation,
    SchoolPeriodsCreateSchoolPeriodMutationVariables
  >(SCHOOL_PERIODS_CREATE_SCHOOL_PERIOD_MUTATION, {
    refetchQueries: ['SchollPeriodsSchollPeriodsQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = (values: SubmitValues): void => {
    createSchoolPeriod({
      variables: {
        input: {
          from: values.from,
          to: values.to,
          quarter: values.quarter,
          schoolYear: values.year,
        },
      },
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
    <EditDialogShared
      open={props.open}
      loading={createSchoolPeriodLoading}
      title="Add"
      submitActionLabel="Add"
      onSubmit={submitHandler}
      onCancel={props.onClose}
    />
  );
};

export default AddDialogIndex;
