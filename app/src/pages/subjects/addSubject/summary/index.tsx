import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import SUBJECTS_ADD_SUBJECT_ADD_MUTATION from 'pages/subjects/addSubject/mutations/add';

import {
  SubjectsAddSubjectAddMutation,
  SubjectsAddSubjectAddMutationVariables,
  SubjectsAddSubjectSummaryClassGroupQuery,
  SubjectsAddSubjectSummaryClassGroupQueryVariables,
  SubjectsAddSubjectSummaryGroupQuery,
  SubjectsAddSubjectSummaryGroupQueryVariables,
} from 'types/graphql';

import SUBJECTS_ADD_SUBJECT_SUMMARY_CLASS_GROUP_QUERY from '../queries/summaryClassGroup';
import SUBJECTS_ADD_SUBJECT_SUMMARY_GROUP_QUERY from '../queries/summaryGroup';
import useAddSubjectState from '../state';

import Summary from './summary';

const SummaryIndex: React.FC = () => {
  const { group, classGroup, teacher } = useAddSubjectState(state => ({
    group: state.group,
    classGroup: state.classGroup,
    teacher: state.teacher,
  }));

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    | SubjectsAddSubjectSummaryGroupQuery
    | SubjectsAddSubjectSummaryClassGroupQuery
    | undefined
  >(undefined);
  const client = useApolloClient();
  const [addSubjectType] = useMutation<
    SubjectsAddSubjectAddMutation,
    SubjectsAddSubjectAddMutationVariables
  >(SUBJECTS_ADD_SUBJECT_ADD_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (group && teacher) {
      setLoading(true);
      client
        .query<
          SubjectsAddSubjectSummaryGroupQuery,
          SubjectsAddSubjectSummaryGroupQueryVariables
        >({
          query: SUBJECTS_ADD_SUBJECT_SUMMARY_GROUP_QUERY,
          variables: { group, teacher },
        })
        .then(res => {
          setLoading(false);
          setData(res.data);
        });
    } else if (classGroup && teacher) {
      setLoading(true);
      client
        .query<
          SubjectsAddSubjectSummaryClassGroupQuery,
          SubjectsAddSubjectSummaryClassGroupQueryVariables
        >({
          query: SUBJECTS_ADD_SUBJECT_SUMMARY_CLASS_GROUP_QUERY,
          variables: { classGroup, teacher },
        })
        .then(res => {
          setLoading(false);
          setData(res.data);
        });
    }
  }, [teacher, group, classGroup]);

  const submitHandler = (): void => {
    setLoading(true);
    addSubjectType({
      variables: {
        input: {
          classGroup,
          group,
          teacher,
        },
      },
    })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });
        router.push(routes.subjects.index);
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar('E', { variant: 'error' });
      });
  };

  let summaryGroup;
  if (data) {
    if ('group' in data) {
      summaryGroup = data?.group;
    } else if ('classGroup' in data) {
      summaryGroup = data?.classGroup;
    }
  }

  return (
    <>
      <Summary
        loading={loading}
        teacher={data?.user}
        group={summaryGroup}
        classGroup={classGroup !== undefined}
        onSubmit={submitHandler}
      />
    </>
  );
};

export default SummaryIndex;
