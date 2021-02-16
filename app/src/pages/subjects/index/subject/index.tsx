import React, { useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import {
  SubjectsARchiveSubjectMutation,
  SubjectsARchiveSubjectMutationVariables,
  SubjectsDeleteSubjectMutation,
  SubjectsDeleteSubjectMutationVariables,
  SubjectsSubjectTypeQuery,
  SubjectsSubjectTypeQueryVariables,
} from 'types/graphql';

import { formatDateToDay } from 'components/formatDate';
import usePagination from 'components/usePagination';

import SUBJECTS_ARCHIVE_SUBJECT_MUTATION from '../mutations/archiveSubject';
import SUBJECTS_DELETE_SUBJECT_MUTATION from '../mutations/deleteSubject';
import SUBJECTS_SUBJECT_TYPE_QUERY from '../queries/subjectType';
import useSubjectsState from '../state';

import Subject from './subject';
import { GetSubjectsArgs, GetSubjectsReturn, Subjects } from './types';

const SubjectIndex: React.FC = () => {
  const { selectedSubject } = useSubjectsState(state => ({
    selectedSubject: state.selectedSubject,
  }));
  const [deleteSubject] = useMutation<
    SubjectsDeleteSubjectMutation,
    SubjectsDeleteSubjectMutationVariables
  >(SUBJECTS_DELETE_SUBJECT_MUTATION);
  const [archiveSubject] = useMutation<
    SubjectsARchiveSubjectMutation,
    SubjectsARchiveSubjectMutationVariables
  >(SUBJECTS_ARCHIVE_SUBJECT_MUTATION);
  const client = useApolloClient();
  const { getPagination, setPagination } = usePagination();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.subjects.index);
  const [showArchived, setShowArchived] = useState(false);

  const addClickHandler = (): void => {
    router.push({
      pathname: routes.subjects.addSubject,
      query: {
        subjectTypeId: selectedSubject,
      },
    });
  };

  const getSubjectsHandler = (query: GetSubjectsArgs): GetSubjectsReturn => {
    const variables = getPagination({
      pageSize: query.pageSize,
      page: query.page,
    });
    if (selectedSubject) {
      return client
        .query<SubjectsSubjectTypeQuery, SubjectsSubjectTypeQueryVariables>({
          query: SUBJECTS_SUBJECT_TYPE_QUERY,
          variables: {
            id: selectedSubject,
            subjectsFirst: variables.first,
            subjectsLast: variables.last,
            subjectsBefore: variables.before,
            subjectsAfter: variables.after,
            exists: [{ archivedAt: showArchived }],
          },
        })
        .then(res => {
          const totalCount = res.data?.subjectType?.subjects?.totalCount || 0;
          const edges = res.data?.subjectType?.subjects?.edges || [];

          setPagination({ totalCount, edges });

          const subjects: Subjects = [];

          edges?.forEach(subject => {
            if (subject?.node) {
              subjects.push({
                ...subject.node,
                archivedAt: formatDateToDay(`${subject.node.archivedAt}`),
              });
            }
          });

          return { totalCount, subjects };
        });
    }

    return Promise.resolve({ totalCount: 0, subjects: [] });
  };

  const editHandler = (subject: string): void => {
    router.push({
      pathname: routes.subjects.editSubject,
      query: { subjectId: subject },
    });
  };

  const deleteHandler = (subject: string): Promise<boolean> => {
    return deleteSubject({ variables: { input: { id: subject } } })
      .then(() => {
        enqueueSnackbar(t('snackbars.delete.success'), { variant: 'success' });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const archiveHandler = (subject: string): Promise<boolean> => {
    return archiveSubject({
      variables: { input: { id: subject, archive: true } },
    })
      .then(() => true)
      .catch(() => false);
  };

  return (
    <Subject
      selectedSubjectType={selectedSubject}
      showArchived={showArchived}
      onAddClick={addClickHandler}
      onGetSubjects={getSubjectsHandler}
      onDelete={deleteHandler}
      onEdit={editHandler}
      onArchive={archiveHandler}
      onShowArchivedChange={setShowArchived}
    />
  );
};
export default SubjectIndex;
