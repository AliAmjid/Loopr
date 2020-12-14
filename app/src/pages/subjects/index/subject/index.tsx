import React from 'react';

import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

import routes from 'config/routes';

import SUBJECTS_SUBJECT_TYPE_QUERY from 'pages/subjects/index/queries/subjectType';
import {
  GetSubjectsArgs,
  GetSubjectsReturn,
  Subjects,
} from 'pages/subjects/index/subject/types';

import {
  SubjectsSubjectTypeQuery,
  SubjectsSubjectTypeQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import useSubjectsState from '../state';

import Subject from './subject';

const SubjectIndex: React.FC = () => {
  const { selectedSubject } = useSubjectsState(state => ({
    selectedSubject: state.selectedSubject,
  }));

  const client = useApolloClient();
  const { getPagination, setPagination } = usePagination();
  const router = useRouter();

  const addClickHandler = (): void => {
    router.push({
      pathname: routes.subjects.editSubject,
      query: {
        subjectTypeId: selectedSubject,
        add: true,
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
          },
        })
        .then(res => {
          const totalCount = res.data?.subjectType?.subjects?.totalCount || 0;
          const edges = res.data?.subjectType?.subjects?.edges || [];

          setPagination({ totalCount, edges });

          const subjects: Subjects = [];

          edges?.forEach(subject => {
            if (subject?.node) {
              subjects.push(subject.node);
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

  return (
    <Subject
      selectedSubjectType={selectedSubject}
      onAddClick={addClickHandler}
      onGetSubjects={getSubjectsHandler}
      onDelete={() => Promise.resolve(true)}
      onEdit={editHandler}
    />
  );
};
export default SubjectIndex;
