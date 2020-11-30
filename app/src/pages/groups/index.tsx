import React, { useEffect, useState } from 'react';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import {
  GroupsAddGroupMutation,
  GroupsAddGroupMutationVariables,
  GroupsGroupQuery,
  GroupsGroupQueryVariables,
  GroupsGroupsQuery,
} from 'types/graphql';

import withPage from 'components/withPage';

import GROUPS_ADD_GROUP_MUTATION from './mutations/addGroup';
import GROUPS_GROUP_QUERY from './queries/group';
import GROUPS_GROUPS_QUERY from './queries/groups';
import Groups from './groups';
import groupsPageOptions from './pageOptions';
import { AddValues, DetailGroup, DetailGroupUsers, TableGroup } from './types';

const GroupsIndex: React.FC = () => {
  const [groupDetail, setGroupDetail] = useState<string | undefined>(undefined);

  const [fetchGroup, { data: groupData, loading: groupLoading }] = useLazyQuery<
    GroupsGroupQuery,
    GroupsGroupQueryVariables
  >(GROUPS_GROUP_QUERY);
  const { data: groupsData, loading: groupsLoading } = useQuery<
    GroupsGroupsQuery
  >(GROUPS_GROUPS_QUERY);
  const [addGroup, { loading: addGroupLoading }] = useMutation<
    GroupsAddGroupMutation,
    GroupsAddGroupMutationVariables
  >(GROUPS_ADD_GROUP_MUTATION, {
    refetchQueries: ['GroupsGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (groupDetail) fetchGroup({ variables: { id: groupDetail } });
  }, [groupDetail]);

  const addHandler = (values: AddValues): Promise<boolean> => {
    return addGroup({
      variables: {
        input: values,
      },
    })
      .then(() => {
        enqueueSnackbar('S', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });

        return false;
      });
  };

  const groups: TableGroup[] = [];
  (groupsData?.groups?.edges?.map(e => e?.node) || []).forEach(group => {
    if (group) {
      groups.push(group);
    }
  });

  const groupUsers: DetailGroupUsers = [];
  groupData?.group?.users?.edges?.forEach(e => {
    if (e?.node) {
      groupUsers.push(e.node);
    }
  });

  const group: DetailGroup = groupData?.group
    ? {
        ...groupData?.group,
        users: groupUsers,
      }
    : undefined;

  return (
    <Groups
      groups={groups}
      group={group}
      onAdd={addHandler}
      groupsLoading={groupsLoading}
      addGroupLoading={addGroupLoading}
      onGroupChange={id => setGroupDetail(id)}
    />
  );
};

export default withPage(groupsPageOptions)(GroupsIndex);
