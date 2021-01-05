import React from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { Query } from 'material-table';
import { useSnackbar } from 'notistack';

import {
  SchollPeriodsSchollPeriodsQuery,
  SchollPeriodsSchollPeriodsQueryVariables,
  SchoolPeriodsDeleteSchoolPeriodMutation,
  SchoolPeriodsDeleteSchoolPeriodMutationVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';
import withPage from 'components/withPage';

import SCHOOL_PERIODS_DELETE_SCHOOL_PERIOD_MUTATION from './mutation/deleteSchoolPeriod';
import SCHOOL_PERIODS_SCHOOL_PERIODS_QUERY from './queries/schoolPeriods';
import schoolPeriodsPageOptions from './pageOptions';
import SchoolPeriods from './schoolPeriods';
import { GetSchoolPeriodsReturn, SchoolPeriod } from './types';

const SchoolPeriodsIndex: React.FC = () => {
  const client = useApolloClient();
  const { getPagination, setPagination } = usePagination();
  const [
    deleteSchoolPeriod,
    { loading: deleteSchoolPeriodLoading },
  ] = useMutation<
    SchoolPeriodsDeleteSchoolPeriodMutation,
    SchoolPeriodsDeleteSchoolPeriodMutationVariables
  >(SCHOOL_PERIODS_DELETE_SCHOOL_PERIOD_MUTATION);
  const { enqueueSnackbar } = useSnackbar();

  const getSchoolPeriods = (
    query: Query<SchoolPeriod>,
  ): Promise<GetSchoolPeriodsReturn> => {
    return client
      .query<
        SchollPeriodsSchollPeriodsQuery,
        SchollPeriodsSchollPeriodsQueryVariables
      >({
        query: SCHOOL_PERIODS_SCHOOL_PERIODS_QUERY,
        variables: {
          ...getPagination({ page: query.page, pageSize: query.pageSize }),
        },
      })
      .then(res => {
        const edges = res.data?.schoolPeriods?.edges;
        const totalCount = res.data?.schoolPeriods?.totalCount;
        if (edges && totalCount) {
          setPagination({ edges, totalCount });

          const schoolPeriods = [];
          for (const schoolPeriod of edges) {
            if (schoolPeriod?.node) {
              schoolPeriods.push(schoolPeriod.node);
            }
          }

          return {
            totalCount,
            schoolPeriods,
          };
        }

        return { totalCount: 0, schoolPeriods: [] };
      })
      .catch(() => {
        return { totalCount: 0, schoolPeriods: [] };
      });
  };

  const deleteHandler = (id: string): void => {
    deleteSchoolPeriod({ variables: { input: { id } } })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });
      });
  };

  return (
    <SchoolPeriods
      getSchoolPeriods={getSchoolPeriods}
      onDelete={deleteHandler}
    />
  );
};

export default withPage(schoolPeriodsPageOptions)(SchoolPeriodsIndex);