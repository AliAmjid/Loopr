import React from 'react';

import { useQuery } from '@apollo/client';

import {
  DashboardWrittenExamsQuery,
  DashboardWrittenExamsQueryVariables,
} from 'types/graphql';

import DASHBOARD_WRITTEN_EXAMS_QUERY from '../queries/writtenExams';

import Exams from './exams';
import { Exams as ExamsType } from './types';

const ExamsIndex: React.FC = () => {
  const { data: examsData, loading: examsLoading } = useQuery<
    DashboardWrittenExamsQuery,
    DashboardWrittenExamsQueryVariables
  >(DASHBOARD_WRITTEN_EXAMS_QUERY, { variables: { first: 6 } });

  const exams: ExamsType = [];
  examsData?.writtenExams?.edges?.forEach(edge => {
    if (edge?.node) exams.push(edge.node);
  });

  return (
    <Exams
      exams={exams}
      loading={examsLoading}
      user={examsData?.meUser || { id: '' }}
    />
  );
};

export default ExamsIndex;
