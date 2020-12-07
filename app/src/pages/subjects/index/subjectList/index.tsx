import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import SUBJECTS_ADD_SUBJECT_TYPE_MUTATION from 'pages/subjects/index/mutations/addSubjectType';
import SUBJECTS_DELETE_SUBJECT_TYPE_MUTATION from 'pages/subjects/index/mutations/deleteSubjectType';
import SUBJECTS_UPDATE_SUBJECT_TYPE_MUTATION from 'pages/subjects/index/mutations/updateSubjectType';
import useSubjectsState from 'pages/subjects/index/state';

import {
  SubjectsAddSubjectTypeMutation,
  SubjectsAddSubjectTypeMutationVariables,
  SubjectsDeleteSubjectTypeMutation,
  SubjectsDeleteSubjectTypeMutationVariables,
  SubjectsSubjectTypesQuery,
  SubjectsUpdateSubjectTypeMutation,
  SubjectsUpdateSubjectTypeMutationVariables,
} from 'types/graphql';

import SUBJECTS_SUBJECT_TYPES_QUERY from '../queries/subjectTypes';

import SubjectList from './subjectList';
import { AddSubjectArgs, Subjects, UpdateSubjectArgs } from './types';

const SubjectListIndex: React.FC = () => {
  const { setSelectedSubject } = useSubjectsState(state => ({
    setSelectedSubject: state.setSelectedSubject,
  }));

  const { data: subjectTypesData, loading: subjectTypesLoading } = useQuery<
    SubjectsSubjectTypesQuery
  >(SUBJECTS_SUBJECT_TYPES_QUERY);
  const [addSubjectType, { loading: addSubjectTypeLoading }] = useMutation<
    SubjectsAddSubjectTypeMutation,
    SubjectsAddSubjectTypeMutationVariables
  >(SUBJECTS_ADD_SUBJECT_TYPE_MUTATION, {
    refetchQueries: ['SubjectsSubjectTypesQuery'],
    awaitRefetchQueries: true,
  });
  // TODO typename
  const [updateSubjectType] = useMutation<
    SubjectsUpdateSubjectTypeMutation,
    SubjectsUpdateSubjectTypeMutationVariables
  >(SUBJECTS_UPDATE_SUBJECT_TYPE_MUTATION, {
    refetchQueries: ['SubjectsSubjectTypesQuery'],
    awaitRefetchQueries: true,
  });
  const [
    deleteSubjectType,
    { loading: deleteSubjectTypeLoading },
  ] = useMutation<
    SubjectsDeleteSubjectTypeMutation,
    SubjectsDeleteSubjectTypeMutationVariables
  >(SUBJECTS_DELETE_SUBJECT_TYPE_MUTATION, {
    refetchQueries: ['SubjectsSubjectTypesQuery'],
    awaitRefetchQueries: true,
  });

  const { enqueueSnackbar } = useSnackbar();

  const subjects: Subjects = [];
  subjectTypesData?.subjectTypes?.edges?.forEach(subject => {
    if (subject?.node)
      subjects.push({
        ...subject?.node,
      });
  });

  const subjectAddHandler = (args: AddSubjectArgs): Promise<boolean> => {
    return addSubjectType({ variables: { input: args } })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });

        return false;
      });
  };

  const subjectUpdateHandler = (args: UpdateSubjectArgs): Promise<boolean> => {
    return updateSubjectType({ variables: { input: args } })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });

        return false;
      });
  };

  const deleteHandler = (subjectType: string): Promise<boolean> => {
    return deleteSubjectType({ variables: { input: { id: subjectType } } })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });

        return false;
      });
  };

  return (
    <SubjectList
      loading={subjectTypesLoading}
      addLoading={addSubjectTypeLoading}
      subjects={subjects}
      deleteLoading={deleteSubjectTypeLoading}
      onSubjectAdd={subjectAddHandler}
      onSubjectUpdate={subjectUpdateHandler}
      onSelectedSubjectChange={(subject: string) => setSelectedSubject(subject)}
      onDelete={deleteHandler}
    />
  );
};

export default SubjectListIndex;
