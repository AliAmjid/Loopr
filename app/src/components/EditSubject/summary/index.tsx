import React, { useEffect, useState } from 'react';

import { useApolloClient } from '@apollo/client';

import {
  SubjectsAddSubjectAddMutation,
  SubjectsAddSubjectAddMutationVariables,
  SubjectsAddSubjectSummaryClassGroupQuery,
  SubjectsAddSubjectSummaryClassGroupQueryVariables,
  SubjectsAddSubjectSummaryGroupQuery,
  SubjectsAddSubjectSummaryGroupQueryVariables,
  SubjectsEditSubjectUpdateMutation,
  SubjectsEditSubjectUpdateMutationVariables,
} from 'types/graphql';

import SUBJECTS_EDIT_SUBJECT_SUMMARY_CLASS_GROUP_QUERY from '../queries/summaryClassGroup';
import SUBJECTS_EDIT_SUBJECT_SUMMARY_GROUP_QUERY from '../queries/summaryGroup';
import useEditSubjectState from '../state';

import Summary from './summary';
import { SummaryIndexProps } from './types';

const SummaryIndex: React.FC<SummaryIndexProps> = props => {
  const { group, classGroup, teacher } = useEditSubjectState(state => ({
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

  useEffect(() => {
    if (group && teacher) {
      setLoading(true);
      client
        .query<
          SubjectsAddSubjectSummaryGroupQuery,
          SubjectsAddSubjectSummaryGroupQueryVariables
        >({
          query: SUBJECTS_EDIT_SUBJECT_SUMMARY_GROUP_QUERY,
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
          query: SUBJECTS_EDIT_SUBJECT_SUMMARY_CLASS_GROUP_QUERY,
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

    props.onSubmit().then(() => {
      setLoading(false);
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
        submitButtonLabel={props.submitButtonLabel}
        teacher={data?.user}
        group={summaryGroup}
        classGroup={classGroup !== undefined}
        onSubmit={submitHandler}
      />
    </>
  );
};

export default SummaryIndex;
