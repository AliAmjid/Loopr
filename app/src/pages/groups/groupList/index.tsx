import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { AddValues, Group, UpdateValues } from 'pages/groups/groupList/types';
import GROUPS_UPDATE_GROUP_MUTATION from 'pages/groups/mutations/updateGroup';
import useGroupsState from 'pages/groups/state';

import {
  GroupsAddGroupMutation,
  GroupsAddGroupMutationVariables,
  GroupsGroupsQuery,
  GroupsUpdateGroupMutation,
  GroupsUpdateGroupMutationVariables,
} from 'types/graphql';

import GROUPS_ADD_GROUP_MUTATION from '../mutations/addGroup';
import GROUPS_GROUPS_QUERY from '../queries/groups';

import GroupList from './groupList';

const GroupListIndex: React.FC = () => {
  const { setSelectedGroup } = useGroupsState(state => ({
    setSelectedGroup: state.setSelectedGroup,
  }));
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
  const [updateGroup] = useMutation<
    GroupsUpdateGroupMutation,
    GroupsUpdateGroupMutationVariables
  >(GROUPS_UPDATE_GROUP_MUTATION, {
    // TODO typename
    refetchQueries: ['GroupsGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();

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

  const updateHandler = (values: UpdateValues): Promise<boolean> => {
    return updateGroup({
      variables: {
        input: { id: values.id, section: values.section, year: 2020 },
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

  const groups: Group[] = [];
  (groupsData?.groups?.edges?.map(e => e?.node) || []).forEach(group => {
    if (group) {
      groups.push(group);
    }
  });

  return (
    <GroupList
      groups={groups}
      onAdd={addHandler}
      groupsLoading={groupsLoading}
      addGroupLoading={addGroupLoading}
      onSelectedGroupChange={(group: string) => {
        setSelectedGroup(group);
      }}
      onUpdate={updateHandler}
    />
  );
};

export default GroupListIndex;
