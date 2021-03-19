import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { AddValues, Group, UpdateValues } from 'pages/groups/groupList/types';
import GROUPS_ARCHIVE_GROUP_MUTATION from 'pages/groups/mutations/archiveGroup';
import GROUPS_DELETE_MUTATION from 'pages/groups/mutations/deleteGroup';
import GROUPS_UPDATE_GROUP_MUTATION from 'pages/groups/mutations/updateGroup';
import useGroupsState from 'pages/groups/state';

import {
  GroupsAddGroupMutation,
  GroupsAddGroupMutationVariables,
  GroupsArchiveGroupMutation,
  GroupsArchiveGroupMutationVariables,
  GroupsDeleteMutation,
  GroupsDeleteMutationVariables,
  GroupsGroupsQuery,
  GroupsGroupsQueryVariables,
  GroupsUpdateGroupMutation,
  GroupsUpdateGroupMutationVariables,
} from 'types/graphql';

import { formatDateToDay } from 'components/formatDate';

import GROUPS_ADD_GROUP_MUTATION from '../mutations/addGroup';
import GROUPS_GROUPS_QUERY from '../queries/groups';

import GroupList from './groupList';

const GroupListIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.groups.index);

  const [filter, setFilter] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const { setSelectedGroup } = useGroupsState(state => ({
    setSelectedGroup: state.setSelectedGroup,
  }));

  const { data: groupsData, loading: groupsLoading } = useQuery<
    GroupsGroupsQuery,
    GroupsGroupsQueryVariables
  >(GROUPS_GROUPS_QUERY, {
    variables: { section: filter, exists: [{ archivedAt: showArchived }] },
  });
  const [addGroup, { loading: addGroupLoading }] = useMutation<
    GroupsAddGroupMutation,
    GroupsAddGroupMutationVariables
  >(GROUPS_ADD_GROUP_MUTATION, {
    refetchQueries: ['GroupsGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const [deleteGroup, { loading: deleteGroupLoading }] = useMutation<
    GroupsDeleteMutation,
    GroupsDeleteMutationVariables
  >(GROUPS_DELETE_MUTATION, {
    refetchQueries: ['GroupsGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const [updateGroup] = useMutation<
    GroupsUpdateGroupMutation,
    GroupsUpdateGroupMutationVariables
  >(GROUPS_UPDATE_GROUP_MUTATION, {
    refetchQueries: ['GroupsGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const [archiveGroup, { loading: archiveGroupLoading }] = useMutation<
    GroupsArchiveGroupMutation,
    GroupsArchiveGroupMutationVariables
  >(GROUPS_ARCHIVE_GROUP_MUTATION, {
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
        enqueueSnackbar(t('snackbars.add.success'), { variant: 'success' });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const updateHandler = (values: UpdateValues): Promise<boolean> => {
    return updateGroup({
      variables: {
        input: { id: values.id, section: values.section },
      },
    })
      .then(() => {
        enqueueSnackbar(t('snackbars.edit.success'), { variant: 'success' });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const deleteHandler = (group: string): Promise<boolean> => {
    return deleteGroup({ variables: { input: { id: group } } })
      .then(() => {
        enqueueSnackbar(t('snackbars.delete.success'), { variant: 'success' });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const archiveHandler = (
    group: string,
    archive: boolean,
  ): Promise<boolean> => {
    return archiveGroup({ variables: { input: { id: group, archive } } })
      .then(() => {
        if (archive)
          enqueueSnackbar(t('snackbars.archive.success'), {
            variant: 'success',
          });
        else
          enqueueSnackbar(t('snackbars.unarchive.success'), {
            variant: 'success',
          });

        return true;
      })
      .catch(() => false);
  };

  const groups: Group[] = [];
  (groupsData?.groups?.edges?.map(e => e?.node) || []).forEach(group => {
    if (group) {
      groups.push({
        ...group,
        archivedAt: formatDateToDay(`${group.archivedAt}`),
      });
    }
  });
  groups.sort((g1, g2) => {
    if (g1.section > g2.section) return 1;
    if (g1.section < g2.section) return -1;

    return 0;
  });

  return (
    <GroupList
      groups={groups}
      onAdd={addHandler}
      groupsLoading={groupsLoading}
      deleteLoading={deleteGroupLoading}
      filter={filter}
      showArchived={showArchived}
      archiveLoading={archiveGroupLoading}
      addGroupLoading={addGroupLoading}
      onSelectedGroupChange={(group: string) => {
        setSelectedGroup(group);
      }}
      onUpdate={updateHandler}
      onDelete={deleteHandler}
      onFilterChange={filter => setFilter(filter)}
      onShowArchivedChange={setShowArchived}
      onArchive={archiveHandler}
    />
  );
};

export default GroupListIndex;
