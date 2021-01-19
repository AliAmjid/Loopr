import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Query } from 'material-table';
import { useSnackbar } from 'notistack';

import resources from 'config/resources';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import useSelectionChange from 'lib/material-table/useSelectionChange';

import GROUPS_GROUP_QUERY from 'pages/groups/queries/group';
import GROUPS_USERS_QUERY from 'pages/groups/queries/users';
import useGroupsState from 'pages/groups/state';

import {
  GroupsClassGroupsQuery,
  GroupsGroupQuery,
  GroupsGroupQueryVariables,
  GroupsUpdateUsersGroupMutation,
  GroupsUpdateUsersGroupMutationVariables,
  GroupsUsersQuery,
  GroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import GROUPS_UPDATE_USERS_GROUP_MUTATION from '../mutations/updateUsersGroup';
import GROUPS_CLASS_GROUPS_QUERY from '../queries/classGroups';

import Group from './group';
import { DetailGroupUser, GetUsersReturn, SelectionChangeArgs } from './types';

const GroupIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.groups.index);
  const { selectedGroup } = useGroupsState(state => ({
    selectedGroup: state.selectedGroup,
  }));
  const client = useApolloClient();
  const { data: classGroupsData, loading: classGroupsLoading } = useQuery<
    GroupsClassGroupsQuery
  >(GROUPS_CLASS_GROUPS_QUERY);
  const [updateUsersGroup] = useMutation<
    GroupsUpdateUsersGroupMutation,
    GroupsUpdateUsersGroupMutationVariables
  >(GROUPS_UPDATE_USERS_GROUP_MUTATION);
  const {
    getPagination: getGroupPagination,
    setPagination: setGroupPagination,
    resetPagination: resetGroupPagination,
  } = usePagination();
  const {
    getPagination: getUserPagination,
    setPagination: setUserPagination,
    resetPagination: resetUserPagination,
  } = usePagination();

  const { enqueueSnackbar } = useSnackbar();
  const {
    changed: changedUsers,
    change: changeSelectedUsers,
    reset: resetSelectedUsers,
    setDefault: setSelectedUsersDefault,
  } = useSelectionChange();

  useEffect(() => {
    resetGroupPagination();
    resetUserPagination();
  }, [selectedGroup]);

  const getGroupUsers = (
    query: Query<DetailGroupUser>,
  ): Promise<GetUsersReturn> => {
    const variables = getGroupPagination({
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
      query.filters.find(filter => filter.column.field === 'classGroup')
        ?.value || [];

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedGroup) {
      return client
        .query<GroupsGroupQuery, GroupsGroupQueryVariables>({
          query: GROUPS_GROUP_QUERY,
          variables: {
            id: selectedGroup,
            usersFirst: variables.first,
            usersLast: variables.last,
            usersBefore: variables.before,
            usersAfter: variables.after,
            email: emailFilter,
            firstname: firstnameFilter,
            lastname: lastnameFilter,
            classGroups: classGroupsFilter,
          },
        })
        .then(res => {
          const edges = res.data?.group?.users?.edges;
          const totalCount = res.data?.group?.users?.totalCount;
          if (edges && totalCount) {
            setGroupPagination({ edges, totalCount });

            const users = [];
            for (const user of res.data?.group?.users?.edges || []) {
              if (user?.node) {
                users.push({
                  ...user.node,
                  classGroup: user.node.classGroup?.id,
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

  const getUsers = (query: Query<DetailGroupUser>): Promise<GetUsersReturn> => {
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
      query.filters.find(filter => filter.column.field === 'classGroup')
        ?.value || [];

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedGroup) {
      return client
        .query<GroupsUsersQuery, GroupsUsersQueryVariables>({
          query: GROUPS_USERS_QUERY,
          variables: {
            ...variables,
            groupId: selectedGroup.substring('/groups/'.length),
            resourceName: resources.user.canStudy,
            email: emailFilter,
            firstname: firstnameFilter,
            lastname: lastnameFilter,
            classGroups: classGroupsFilter,
          },
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: DetailGroupUser[] = [];
            for (const user of res.data?.users?.edges || []) {
              if (user?.node) {
                const node = user?.node;
                users.push({
                  ...node,
                  classGroup: node?.classGroup?.id,
                  tableData: {
                    checked: (node.groups?.edges?.length || 0) > 0,
                  },
                });
              }
            }
            setSelectedUsersDefault(
              users.map(u => ({
                id: u.id,
                selected: u.tableData?.checked || false,
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
    return updateUsersGroup({
      variables: {
        input: {
          id: `${selectedGroup}`,
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
        resetSelectedUsers();

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const classGroupLookup: Record<string, string> = {};
  classGroupsData?.classGroups?.edges?.forEach(classGroupEdge => {
    if (classGroupEdge?.node) {
      classGroupLookup[
        classGroupEdge.node.id
      ] = `${classGroupEdge.node.year} ${classGroupEdge.node.section}`;
    }
  });

  return (
    <Group
      selectedGroup={selectedGroup}
      getUsers={getUsers}
      getGroupUsers={getGroupUsers}
      classGroupLookup={classGroupLookup}
      loading={classGroupsLoading}
      onSelectionChange={changeSelectedUsers}
      onSelectionCancel={resetSelectedUsers}
      onSubmit={submitHandler}
    />
  );
};

export default GroupIndex;
