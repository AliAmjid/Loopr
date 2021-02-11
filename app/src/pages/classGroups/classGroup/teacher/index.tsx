import React from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Query } from 'material-table';
import { useSnackbar } from 'notistack';

import resources from 'config/resources';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import {
  ClassGroupsClassGroupTeacher,
  ClassGroupsClassGroupTeacherVariables,
  ClassGroupsUpdateClassGroupMutation,
  ClassGroupsUpdateClassGroupMutationVariables,
  ClassGroupsUsersQuery,
  ClassGroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION from '../../mutations/updateClassGroup';
import CLASS_GROUPS_CLASS_GROUP_TEACHER from '../../queries/classGroupTeacher';
import CLASS_GROUPS_USERS_QUERY from '../../queries/users';
import useClassGroupsState from '../../state';

import Teacher from './teacher';
import { DetailClassGroupUser, GetUsersReturn } from './types';

const TeacherIndex: React.FC = () => {
  const { selectedClassGroup } = useClassGroupsState(state => ({
    selectedClassGroup: state.selectedClassGroup,
  }));
  const {
    data: classGroupTeacherData,
    loading: classGroupTeacherLoading,
  } = useQuery<
    ClassGroupsClassGroupTeacher,
    ClassGroupsClassGroupTeacherVariables
  >(CLASS_GROUPS_CLASS_GROUP_TEACHER, {
    variables: { id: `${selectedClassGroup}` },
  });
  const [updateClassGroup] = useMutation<
    ClassGroupsUpdateClassGroupMutation,
    ClassGroupsUpdateClassGroupMutationVariables
  >(CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION, {
    refetchQueries: ['ClassGroupsClassGroupTeacher'],
    awaitRefetchQueries: true,
  });
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
  } = usePagination();
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.classGroups.index);

  const getUsersHandler = (
    query: Query<DetailClassGroupUser>,
  ): Promise<GetUsersReturn> => {
    const variables = getUserPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const emailFilter =
      query.filters.find(filter => filter.column.field === 'email')?.value ||
      '';
    const firstnameFilter =
      query.filters.find(filter => filter.column.field === 'firstname')
        ?.value || '';
    const lastnameFilter =
      query.filters.find(filter => filter.column.field === 'lastname')?.value ||
      '';

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<ClassGroupsUsersQuery, ClassGroupsUsersQueryVariables>({
          query: CLASS_GROUPS_USERS_QUERY,
          variables: {
            ...variables,
            resourceName: resources.group.teacher,
            email: emailFilter,
            firstname: firstnameFilter,
            lastname: lastnameFilter,
          },
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: DetailClassGroupUser[] = [];
            for (const user of res.data?.users?.edges || []) {
              if (user?.node) {
                users.push({
                  ...user?.node,
                });
              }
            }

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };

  const changeHandler = (id: string): Promise<boolean> => {
    if (selectedClassGroup) {
      return updateClassGroup({
        variables: { input: { id: selectedClassGroup, teacher: id } },
      })
        .then(() => {
          enqueueSnackbar(t('snackbars.teacherEdit.success'), {
            variant: 'success',
          });

          return true;
        })
        .catch(() => {
          return false;
        });
    }

    return Promise.resolve(false);
  };

  const teacher = classGroupTeacherData?.classGroup?.teacher || undefined;

  return (
    <Teacher
      teacher={teacher ? { ...teacher } : undefined}
      loading={classGroupTeacherLoading}
      onGetUsers={getUsersHandler}
      onChange={changeHandler}
    />
  );
};

export default TeacherIndex;
