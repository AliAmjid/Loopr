import React, { useEffect } from 'react';

import { useApolloClient } from '@apollo/client';
import { Query } from 'material-table';

import GROUPS_GROUP_QUERY from 'pages/groups/queries/group';
import GROUPS_USERS_QUERY from 'pages/groups/queries/users';
import useGroupsState from 'pages/groups/state';

import {
  GroupsGroupQuery,
  GroupsGroupQueryVariables,
  GroupsUsersQuery,
  GroupsUsersQueryVariables,
} from 'types/graphql';

import usePagination from 'components/usePagination';

import Group from './group';
import { DetailGroupUser, GetUsersReturn } from './types';

const GroupIndex: React.FC = () => {
  const { selectedGroup } = useGroupsState(state => ({
    selectedGroup: state.selectedGroup,
  }));
  const client = useApolloClient();
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

    const defaultValue = { users: [], totalCount: 0 };

    if (selectedGroup) {
      return client
        .query<GroupsUsersQuery, GroupsUsersQueryVariables>({
          query: GROUPS_USERS_QUERY,
          variables,
        })
        .then(res => {
          const edges = res.data?.users?.edges;
          const totalCount = res.data?.users?.totalCount;
          if (edges && totalCount) {
            setUserPagination({ edges, totalCount });

            const users: DetailGroupUser[] = [];
            for (const user of res.data?.users?.edges || []) {
              if (user?.node)
                users.push({
                  ...user.node,
                  tableData: { checked: true },
                });
            }

            return { users, totalCount };
          }

          return defaultValue;
        });
    }

    return Promise.resolve(defaultValue);
  };

  return (
    <Group
      selectedGroup={selectedGroup}
      getUsers={getUsers}
      getGroupUsers={getGroupUsers}
    />
  );
};

export default GroupIndex;
