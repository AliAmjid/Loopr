import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import {
  GroupsAddGroupMutation,
  GroupsAddGroupMutationVariables,
  GroupsGroupsQuery,
} from 'types/graphql';

import withPage from 'components/withPage';

import GROUPS_ADD_GROUP_MUTATION from './mutations/addGroup';
import GROUPS_GROUPS_QUERY from './queries/groups';
import Groups from './groups';
import groupsPageOptions from './pageOptions';
import { AddValues, TableGroup } from './types';

const GroupsIndex: React.FC = () => {
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

  return (
    <Groups
      groups={groups}
      onAdd={addHandler}
      groupsLoading={groupsLoading}
      addGroupLoading={addGroupLoading}
    />
  );
};

export default withPage(groupsPageOptions)(GroupsIndex);
