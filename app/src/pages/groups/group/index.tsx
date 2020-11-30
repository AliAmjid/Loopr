import React, { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import GROUPS_GROUP_QUERY from 'pages/groups/queries/group';
import useGroupsState from 'pages/groups/state';

import { GroupsGroupQuery, GroupsGroupQueryVariables } from 'types/graphql';

import Group from './group';
import { DetailGroup, DetailGroupUsers } from './types';

const GroupIndex: React.FC = () => {
  const { selectedGroup } = useGroupsState(state => ({
    selectedGroup: state.selectedGroup,
  }));
  const [fetchGroup, { data: groupData, loading: groupLoading }] = useLazyQuery<
    GroupsGroupQuery,
    GroupsGroupQueryVariables
  >(GROUPS_GROUP_QUERY);

  useEffect(() => {
    if (selectedGroup) fetchGroup({ variables: { id: selectedGroup } });
  }, [selectedGroup]);

  const groupUsers: DetailGroupUsers = [];
  groupData?.group?.users?.edges?.forEach(e => {
    if (e?.node) {
      groupUsers.push({ ...e.node });
    }
  });

  const group: DetailGroup = groupData?.group
    ? {
        ...groupData?.group,
        users: groupUsers,
      }
    : undefined;

  return <Group group={group} loading={groupLoading} />;
};

export default GroupIndex;
