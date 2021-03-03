import React from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Query } from 'material-table';
import { useSnackbar } from 'notistack';

import resources from 'config/resources';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import useSelectionChange from 'lib/material-table/useSelectionChange';

import CLASS_GROUPS_CLASS_GROUPS_QUERY from 'pages/classGroups/queries/classGroups';

import {
  ClassGroupsClassGroupsQuery,
  ClassGroupsClassGroupUsersQuery,
  ClassGroupsClassGroupUsersQueryVariables,
  ClassGroupsUpdateUsersClassGroupMutation,
  ClassGroupsUpdateUsersClassGroupMutationVariables,
  ClassGroupsUsersQuery,
  ClassGroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import CLASS_GROUPS_UPDATE_USERS_CLASS_GROUP_MUTATION from '../../mutations/updateUsersClassGroup';
import CLASS_GROUPS_CLASS_GROUP_USERS_QUERY from '../../queries/classGroupUsers';
import CLASS_GROUPS_USERS_QUERY from '../../queries/users';
import useClassGroupsState from '../../state';

import Students from './students';
import {
  ClassGroupUser,
  GetClassGroupUsersReturn,
  GetUsersReturn,
  User,
} from './types';

const StudentsIndex: React.FC = () => {
  const { selectedClassGroup } = useClassGroupsState(state => ({
    selectedClassGroup: state.selectedClassGroup,
  }));
  const [updateUsersClassGroup] = useMutation<
    ClassGroupsUpdateUsersClassGroupMutation,
    ClassGroupsUpdateUsersClassGroupMutationVariables
  >(CLASS_GROUPS_UPDATE_USERS_CLASS_GROUP_MUTATION);
  const { data: classGroupsData, loading: classGroupsLoading } = useQuery<
    ClassGroupsClassGroupsQuery,
    ClassGroupsClassGroupUsersQueryVariables
  >(CLASS_GROUPS_CLASS_GROUPS_QUERY);

  const {
    getPagination: getClassGroupPagination,
    setPagination: setClassGroupPagination,
  } = usePagination();
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
  } = usePagination();
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.classGroups.index);
  const {
    changed: changedUsers,
    change: changeUsers,
    reset: resetChangedUsers,
    setDefault: setDefaultChangedUsers,
  } = useSelectionChange();

  const getClassGroupUsersHandler = (
    query: Query<ClassGroupUser>,
  ): Promise<GetClassGroupUsersReturn> => {
    const variables = getClassGroupPagination({
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
            email: emailFilter,
            firstname: firstnameFilter,
            lastname: lastnameFilter,
          },
        })
        .then(res => {
          const edges = res.data?.classGroup?.users?.edges;
          const totalCount = res.data?.classGroup?.users?.totalCount;
          if (edges && totalCount) {
            setClassGroupPagination({ edges, totalCount });

            const users = [];
            for (const user of res.data?.classGroup?.users?.edges || []) {
              if (user?.node)
                users.push({
                  ...user.node,
                });
            }

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };
  const getUsersHandler = (query: Query<User>): Promise<GetUsersReturn> => {
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
    const classGroupsFilter =
      query.filters.find(filter => filter.column.field === 'classGroup.id')
        ?.value || [];
    const isInClassGroupFilter = classGroupsFilter.some(
      (f: string) => f === 'none',
    );

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedClassGroup) {
      return client
        .query<ClassGroupsUsersQuery, ClassGroupsUsersQueryVariables>({
          query: CLASS_GROUPS_USERS_QUERY,
          variables: {
            ...variables,
            resourceName: resources.user.canStudy,
            email: emailFilter,
            firstname: firstnameFilter,
            lastname: lastnameFilter,
            isInClassGroup:
              classGroupsFilter.length === 0
                ? undefined
                : !isInClassGroupFilter,
            classGroups: !isInClassGroupFilter ? classGroupsFilter : [],
          },
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: User[] = [];
            for (const user of res.data?.users?.edges || []) {
              if (user?.node) {
                const node = user?.node;

                users.push({
                  ...node,

                  tableData: {
                    checked: node.classGroup?.id === selectedClassGroup,
                  },
                });
              }
            }
            setDefaultChangedUsers(
              users.map(user => ({
                id: user.id,
                selected: user.tableData?.checked || false,
              })),
            );

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };

  const submitHandler = (): Promise<boolean> => {
    return updateUsersClassGroup({
      variables: {
        input: {
          id: `${selectedClassGroup}`,
          addUsers: changedUsers
            .filter(user => user.selected)
            .map(user => user.id),
          deleteUsers: changedUsers
            .filter(user => !user.selected)
            .map(user => user.id),
        },
      },
    })
      .then(() => {
        enqueueSnackbar(t('snackbars.studentsEdit.success'), {
          variant: 'success',
        });
        resetChangedUsers();

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const classGroupsLookup: Record<string, string> = { none: t('noClassGroup') };
  classGroupsData?.classGroups?.edges?.forEach(edge => {
    if (edge?.node) {
      classGroupsLookup[
        edge.node.id
      ] = `${edge.node.year} ${edge.node.section}`;
    }
  });

  return (
    <Students
      selectedClassGroup={selectedClassGroup}
      classGroupsLookup={classGroupsLookup}
      loading={classGroupsLoading}
      onGetClassGroupUsers={getClassGroupUsersHandler}
      onGetUsers={getUsersHandler}
      onSelectionChange={changeUsers}
      onSelectionClose={resetChangedUsers}
      onSubmit={submitHandler}
    />
  );
};

export default StudentsIndex;
