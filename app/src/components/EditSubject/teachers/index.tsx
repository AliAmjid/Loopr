import React from 'react';

import { useApolloClient } from '@apollo/client';

import resources from 'config/resources';

import {
  EditSubjectTeacherQuery,
  EditSubjectTeacherQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import EDIT_SUBJECT_TEACHER_QUERY from '../queries/teachers';
import useEditSubjectState from '../state';

import Teachers from './teachers';
import { Teacher, TeacherGetArgs, TeacherGetReturn } from './types';

const TeachersIndex: React.FC = () => {
  const { teacher, setTeacher } = useEditSubjectState(state => ({
    teacher: state.teacher,
    setTeacher: state.setTeacher,
  }));

  const client = useApolloClient();
  const { getPagination, setPagination } = usePagination();

  const teacherGetHandler = (query: TeacherGetArgs): TeacherGetReturn => {
    const emailFilter = query.filters.find(f => f.column.field === 'email')
      ?.value;
    const firstNameFilter = query.filters.find(
      f => f.column.field === 'firstname',
    )?.value;
    const lastNameFilter = query.filters.find(
      f => f.column.field === 'lastname',
    )?.value;

    return client
      .query<EditSubjectTeacherQuery, EditSubjectTeacherQueryVariables>({
        query: EDIT_SUBJECT_TEACHER_QUERY,
        variables: {
          ...getPagination({ page: query.page, pageSize: query.pageSize }),
          resourceName: resources.group.teacher,
          email: emailFilter,
          lastname: lastNameFilter,
          firstname: firstNameFilter,
        },
      })
      .then(res => {
        const totalCount = res.data?.users?.totalCount;
        const edges = res.data?.users?.edges;
        if (totalCount && edges) {
          setPagination({ edges, totalCount });

          const teachers: Teacher[] = [];
          edges?.map(teacher => {
            if (teacher?.node) {
              teachers.push(teacher.node);
            }
          });

          return { totalCount, teachers };
        }

        return { totalCount: 0, teachers: [] };
      });
  };

  const selectHandler = (teacher: string): void => {
    setTeacher(teacher);
  };

  return (
    <Teachers
      selectedTeacher={teacher}
      onTeacherGet={teacherGetHandler}
      onSelect={selectHandler}
    />
  );
};

export default TeachersIndex;
