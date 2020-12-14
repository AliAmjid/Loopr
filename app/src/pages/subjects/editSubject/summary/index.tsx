import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import SUBJECTS_EDIT_SUBJECT_ADD_MUTATION from 'pages/subjects/editSubject/mutations/add';
import SUBJECTS_EDIT_SUBJECT_UPDATE_MUTATION from 'pages/subjects/editSubject/mutations/update';

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

const SummaryIndex: React.FC = () => {
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
  const [addSubject] = useMutation<
    SubjectsAddSubjectAddMutation,
    SubjectsAddSubjectAddMutationVariables
  >(SUBJECTS_EDIT_SUBJECT_ADD_MUTATION);
  const [updateSubject] = useMutation<
    SubjectsEditSubjectUpdateMutation,
    SubjectsEditSubjectUpdateMutationVariables
  >(SUBJECTS_EDIT_SUBJECT_UPDATE_MUTATION);
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

    if (
      // eslint-disable-next-line no-extra-boolean-cast
      Boolean(router.query.add)
    ) {
      addSubject({
        variables: {
          input: {
            classGroup,
            group,
            teacher,
            subjectType: `${router.query.subjectTypeId}`,
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
    } else {
      updateSubject({
        variables: {
          input: {
            id: `${router.query.subjectId}`,
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
    }
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
        editing={
          // eslint-disable-next-line no-extra-boolean-cast
          !Boolean(router.query.add)
        }
        teacher={data?.user}
        group={summaryGroup}
        classGroup={classGroup !== undefined}
        onSubmit={submitHandler}
      />
    </>
  );
};

export default SummaryIndex;
