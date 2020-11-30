import React, { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import GROUPS_GROUP_QUERY from 'pages/groups/queries/group';

import { GroupsGroupQuery, GroupsGroupQueryVariables } from 'types/graphql';

import Group from './group';
import { DetailGroup, DetailGroupUsers, GroupIndexProps } from './types';

const GroupIndex: React.FC<GroupIndexProps> = props => {
  const [fetchGroup, { data: groupData, loading: groupLoading }] = useLazyQuery<
    GroupsGroupQuery,
    GroupsGroupQueryVariables
  >(GROUPS_GROUP_QUERY);

  useEffect(() => {
    if (props.selectedGroup)
      fetchGroup({ variables: { id: props.selectedGroup } });
  }, [props.selectedGroup]);

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
