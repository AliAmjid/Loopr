import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Query } from 'material-table';
import { useSnackbar } from 'notistack';

import resources from 'config/resources';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import CLASS_GROUPS_CLASS_GROUP_TEACHER from 'pages/classGroups/queries/classGroupTeacher';

import {
  ClassGroupsClassGroupTeacher,
  ClassGroupsClassGroupTeacherVariables,
  ClassGroupsClassGroupUsersQuery,
  ClassGroupsClassGroupUsersQueryVariables,
  ClassGroupsUpdateClassGroupMutation,
  ClassGroupsUpdateClassGroupMutationVariables,
  ClassGroupsUsersQuery,
  ClassGroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION from '../mutations/updateClass';
import CLASS_GROUPS_CLASS_GROUP_USERS_QUERY from '../queries/classGroupUsers';
import CLASS_GROUPS_USERS_QUERY from '../queries/users';
import useClassGroupsState from '../state';

import ClassGroup from './classGroup';
import {
  DetailClassGroupUser,
  GetUsersReturn,
  SelectionChangeArgs,
} from './types';

const ClassIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);
  const { selectedClassGroup } = useClassGroupsState(state => ({
    selectedClassGroup: state.selectedClassGroup,
  }));

  const client = useApolloClient();
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
    getPagination: getClassGroupPagination,
    setPagination: setClassGroupPagination,
    resetPagination: resetClassGroupPagination,
  } = usePagination();
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
    resetPagination: resetUserPagination,
  } = usePagination();

  const [selected, setSelected] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    resetClassGroupPagination();
    resetUserPagination();
  }, [selectedClassGroup]);

  const getClassGroupUsersHandler = (
    query: Query<DetailClassGroupUser>,
  ): Promise<GetUsersReturn> => {
    const variables = getClassGroupPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<
          ClassGroupsClassGroupUsersQuery,
          ClassGroupsClassGroupUsersQueryVariables
        >({
          query: CLASS_GROUPS_CLASS_GROUP_USERS_QUERY,
          variables: {
            id: selectedClassGroup,
            usersFirst: variables.first,
            usersLast: variables.last,
            usersBefore: variables.before,
            usersAfter: variables.after,
          },
        })
        .then(res => {
          const edges = res.data?.classGroup?.users?.edges;
          const totalCount = res.data?.classGroup?.users?.totalCount;
          if (edges && totalCount) {
            setClassGroupPagination({ edges, totalCount });

            const users = [];
            for (const user of res.data?.classGroup?.users?.edges || []) {
              if (user?.node) users.push(user.node);
            }

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };

  const getUsersHandler = (
    query: Query<DetailClassGroupUser>,
    teacher: boolean,
  ): Promise<GetUsersReturn> => {
    const variables = getUserPagination({
      page: query.page,
      pageSize: query.pageSize,
    });

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<ClassGroupsUsersQuery, ClassGroupsUsersQueryVariables>({
          query: CLASS_GROUPS_USERS_QUERY,
          variables: {
            ...variables,
            resourceName: teacher ? resources.group.teacher : '',
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
                const node = user?.node;
                users.push({
                  ...node,
                  tableData: {
                    checked: selected.some(id => id === node.id),
                  },
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

  const selectionChangeHandler = (args: SelectionChangeArgs): void => {
    if (args.selected) {
      setSelected(prevState => [...prevState, args.id]);
    } else {
      setSelected(prevState => {
        prevState.splice(
          prevState.findIndex(s => s === args.id),
          1,
        );

        return prevState;
      });
    }
  };

  const submitHandler = (): Promise<boolean> => {
    if (selectedClassGroup) {
      return updateClassGroup({
        variables: { input: { id: selectedClassGroup, users: selected } },
      })
        .then(() => {
          enqueueSnackbar(t('snackbars.studentsEdit.success'), {
            variant: 'success',
          });

          return true;
        })
        .catch(() => {
          enqueueSnackbar(t('snackbars.studentsEdit.error'), {
            variant: 'error',
          });

          return false;
        });
    }

    return Promise.resolve(false);
  };

  const teacherChangeHandler = (id: string): Promise<boolean> => {
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
          enqueueSnackbar(t('snackbars.teacherEdit.error'), {
            variant: 'error',
          });

          return false;
        });
    }

    return Promise.resolve(false);
  };

  const teacher = classGroupTeacherData?.classGroup?.teacher || undefined;

  return (
    <ClassGroup
      teacher={teacher ? { ...teacher } : undefined}
      teacherLoading={classGroupTeacherLoading}
      selectedClassGroup={selectedClassGroup}
      onGetUsers={getUsersHandler}
      onGetClassGroupUsers={getClassGroupUsersHandler}
      onStudentsChange={selectionChangeHandler}
      onStudentsSubmit={submitHandler}
      onTeacherChange={teacherChangeHandler}
    />
  );
};

export default ClassIndex;
