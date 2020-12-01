import React from 'react';

import { useApolloClient } from '@apollo/client';
import { Query } from 'material-table';

import GROUPS_GROUP_QUERY from 'pages/groups/queries/group';
import useGroupsState from 'pages/groups/state';

import { GroupsGroupQuery, GroupsGroupQueryVariables } from 'types/graphql';

import usePagination from 'components/usePagination';

import Group from './group';
import { DetailGroupUser, GetGroupsUsersReturn } from './types';

const GroupIndex: React.FC = () => {
  const { selectedGroup } = useGroupsState(state => ({
    selectedGroup: state.selectedGroup,
  }));
  const client = useApolloClient();
  const { getPagination, setPagination } = usePagination();

  const getGroupUsers = (
    query: Query<DetailGroupUser>,
  ): Promise<GetGroupsUsersReturn> => {
    const variables = getPagination({
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
            setPagination({ edges, totalCount });

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

  return <Group selectedGroup={selectedGroup} getGroupUsers={getGroupUsers} />;
};

export default GroupIndex;
