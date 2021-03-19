import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import CLASS_GROUPS_ARCHIVE_CLASS_GROUP_MUTATION from 'pages/classGroups/mutations/archiveClassGroup';
import CLASS_GROUPS_DELETE_CLASS_GROUP_MUTATION from 'pages/classGroups/mutations/deleteClassGroup';

import {
  ClassGroupsAddClassGroupMutation,
  ClassGroupsAddClassGroupMutationVariables,
  ClassGroupsArchiveClassGroupMutation,
  ClassGroupsArchiveClassGroupMutationVariables,
  ClassGroupsClassGroupsQuery,
  ClassGroupsClassGroupsQueryVariables,
  ClassGroupsDeleteClassGroupMutation,
  ClassGroupsDeleteClassGroupMutationVariables,
  ClassGroupsUpdateClassGroupMutation,
  ClassGroupsUpdateClassGroupMutationVariables,
} from 'types/graphql';

import CLASS_GROUPS_ADD_CLASS_GROUP_MUTATION from '../mutations/addClassGroup';
import CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION from '../mutations/updateClassGroup';
import CLASS_GROUPS_CLASS_GROUPS_QUERY from '../queries/classGroups';
import useClassGroupsState from '../state';

import ClassGroupList from './classGroupList';
import { AddValues, ClassGroup, UpdateValues } from './types';

const ClassGroupListIndex: React.FC = () => {
  const { t } = useTranslation(namespaces.pages.classGroups.index);
  const { setSelectedClassGroup } = useClassGroupsState(state => ({
    setSelectedClassGroup: state.setSelectedClassGroup,
  }));
  const [showArchived, setShowArchived] = useState(false);
  const { data: classesData, loading: classGroupLoading } = useQuery<
    ClassGroupsClassGroupsQuery,
    ClassGroupsClassGroupsQueryVariables
  >(CLASS_GROUPS_CLASS_GROUPS_QUERY, {
    variables: { exists: [{ archivedAt: showArchived }] },
  });
  const [addClassGroup, { loading: addClassGroupLoading }] = useMutation<
    ClassGroupsAddClassGroupMutation,
    ClassGroupsAddClassGroupMutationVariables
  >(CLASS_GROUPS_ADD_CLASS_GROUP_MUTATION, {
    refetchQueries: ['ClassGroupsClassGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const [updateClassGroup, { loading: updateClassGroupLoading }] = useMutation<
    ClassGroupsUpdateClassGroupMutation,
    ClassGroupsUpdateClassGroupMutationVariables
  >(CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION, {
    refetchQueries: ['ClassGroupsClassGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const [deleteClassGroup, { loading: deleteClassGroupLoading }] = useMutation<
    ClassGroupsDeleteClassGroupMutation,
    ClassGroupsDeleteClassGroupMutationVariables
  >(CLASS_GROUPS_DELETE_CLASS_GROUP_MUTATION, {
    refetchQueries: ['ClassGroupsClassGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const [archiveClassGroup, { loading: archiveLoading }] = useMutation<
    ClassGroupsArchiveClassGroupMutation,
    ClassGroupsArchiveClassGroupMutationVariables
  >(CLASS_GROUPS_ARCHIVE_CLASS_GROUP_MUTATION, {
    refetchQueries: ['ClassGroupsClassGroupsQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  const addHandler = (values: AddValues): Promise<boolean> => {
    return addClassGroup({
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
    return updateClassGroup({
      variables: {
        input: { id: values.id, section: values.section, year: values.year },
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

  const deleteHandler = (classGroup: string): Promise<boolean> => {
    return deleteClassGroup({ variables: { input: { id: classGroup } } })
      .then(() => {
        enqueueSnackbar(t('snackbars.delete.success'), { variant: 'success' });

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  const archiveHandler = (
    classGroup: string,
    archive: boolean,
  ): Promise<boolean> => {
    return archiveClassGroup({
      variables: { input: { id: classGroup, archive } },
    })
      .then(() => {
        enqueueSnackbar(
          archive
            ? t('snackbars.archive.success')
            : t('snackbars.unarchive.success'),
          { variant: 'success' },
        );

        return true;
      })
      .catch(() => false);
  };

  const classGroups: ClassGroup[] = [];
  (classesData?.classGroups?.edges?.map(e => e?.node) || []).forEach(
    classGroup => {
      if (classGroup) {
        classGroups.push(classGroup);
      }
    },
  );
  classGroups.sort((g1, g2) => {
    if (g1.year > g2.year) return 1;
    if (g1.year < g2.year) return -1;
    if (g1.section > g2.section) return 1;
    if (g1.section < g2.section) return -1;

    return 0;
  });

  return (
    <ClassGroupList
      classGroups={classGroups}
      onAdd={addHandler}
      classGroupsLoading={classGroupLoading}
      updateClassGroupLoading={updateClassGroupLoading}
      addClassGroupLoading={addClassGroupLoading}
      showArchived={showArchived}
      deleteLoading={deleteClassGroupLoading}
      archiveLoading={archiveLoading}
      onSelectedClassChange={(cl: string) => {
        setSelectedClassGroup(cl);
      }}
      onUpdate={updateHandler}
      onDelete={deleteHandler}
      onShowArchivedChange={setShowArchived}
      onArchive={archiveHandler}
    />
  );
};

export default ClassGroupListIndex;
