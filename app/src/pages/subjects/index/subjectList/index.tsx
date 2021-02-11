import React, { useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

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
  const { t } = useTranslation(namespaces.pages.subjects.index);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSelectedSubject(undefined);
  }, []);

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
        enqueueSnackbar(t('snackbars.typeAdd.success'), { variant: 'success' });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const subjectUpdateHandler = (args: UpdateSubjectArgs): Promise<boolean> => {
    return updateSubjectType({ variables: { input: args } })
      .then(() => {
        enqueueSnackbar(t('snackbars.typeEdit.success'), {
          variant: 'success',
        });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const deleteHandler = (subjectType: string): Promise<boolean> => {
    return deleteSubjectType({ variables: { input: { id: subjectType } } })
      .then(() => {
        enqueueSnackbar(t('snackbars.typeDelete.success'), {
          variant: 'success',
        });

        return true;
      })
      .catch(() => {
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
