import React, { useEffect, useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';
import { Query } from 'material-table';
import { useSnackbar } from 'notistack';

import resources from 'config/resources';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import GROUPS_GROUP_QUERY from 'pages/groups/queries/group';
import GROUPS_USERS_QUERY from 'pages/groups/queries/users';
import useGroupsState from 'pages/groups/state';

import {
  GroupsGroupQuery,
  GroupsGroupQueryVariables,
  GroupsUpdateUsersGroupMutation,
  GroupsUpdateUsersGroupMutationVariables,
  GroupsUsersQuery,
  GroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import GROUPS_UPDATE_USERS_GROUP_MUTATION from '../mutations/updateUsersGroup';

import Group from './group';
import { DetailGroupUser, GetUsersReturn, SelectionChangeArgs } from './types';

const GroupIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.groups.index);
  const { selectedGroup } = useGroupsState(state => ({
    selectedGroup: state.selectedGroup,
  }));
  const client = useApolloClient();
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
  const [changedUsers, setChangedUsers] = useState<
    {
      id: string;
      selected: boolean;
    }[]
  >([]);
  const { enqueueSnackbar } = useSnackbar();

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
          },
        })
        .then(res => {
          const edges = res.data?.group?.users?.edges;
          const totalCount = res.data?.group?.users?.totalCount;
          if (edges && totalCount) {
            setGroupPagination({ edges, totalCount });

            const users = [];
            for (const user of res.data?.group?.users?.edges || []) {
              if (user?.node) users.push(user.node);
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
                  tableData: {
                    checked: (node.groups?.edges?.length || 0) > 0,
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
    setChangedUsers(prevState => {
      const index = prevState.findIndex(
        changedUser => changedUser.id === args.id,
      );
      if (index !== -1) {
        prevState.splice(index, 1);
      } else {
        prevState = [...prevState, { id: args.id, selected: args.selected }];
      }

      return prevState;
    });
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
        setChangedUsers([]);

        return true;
      })
      .catch(() => {
        enqueueSnackbar(t('snackbars.studentsEdit.error'), {
          variant: 'error',
        });

        return false;
      });
  };

  return (
    <Group
      selectedGroup={selectedGroup}
      getUsers={getUsers}
      getGroupUsers={getGroupUsers}
      onSelectionChange={selectionChangeHandler}
      onSubmit={submitHandler}
    />
  );
};

export default GroupIndex;
