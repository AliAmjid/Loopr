import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import {
  ClassGroupsAddClassGroupMutation,
  ClassGroupsAddClassGroupMutationVariables,
  ClassGroupsClassGroupsQuery,
  ClassGroupsUpdateClassGroupMutation,
  ClassGroupsUpdateClassGroupMutationVariables,
} from 'types/graphql';

import CLASS_GROUPS_ADD_CLASS_GROUP_MUTATION from '../mutations/addClass';
import CLASS_GROUPS_UPDATE_CLASS_GROUP_MUTATION from '../mutations/updateClass';
import CLASS_GROUPS_CLASS_GROUPS_QUERY from '../queries/classGroups';
import useClassGroupsState from '../state';

import ClassGroupList from './classGroupList';
import { AddValues, ClassGroup, UpdateValues } from './types';

const ClassGroupListIndex: React.FC = () => {
  const { setSelectedClassGroup } = useClassGroupsState(state => ({
    setSelectedClassGroup: state.setSelectedClassGroup,
  }));
  const { data: classesData, loading: classGroupLoading } = useQuery<
    ClassGroupsClassGroupsQuery
  >(CLASS_GROUPS_CLASS_GROUPS_QUERY);
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
    // TODO typename
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
        enqueueSnackbar('S', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });

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
        enqueueSnackbar('S', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('E', { variant: 'error' });

        return false;
      });
  };

  const classGroups: ClassGroup[] = [];
  (classesData?.classGroups?.edges?.map(e => e?.node) || []).forEach(
    classGroup => {
      if (classGroup) {
        classGroups.push(classGroup);
      }
    },
  );

  return (
    <ClassGroupList
      classGroups={classGroups}
      onAdd={addHandler}
      classGroupsLoading={classGroupLoading}
      updateClassGroupLoading={updateClassGroupLoading}
      addClassGroupLoading={addClassGroupLoading}
      onSelectedClassChange={(cl: string) => {
        setSelectedClassGroup(cl);
      }}
      onUpdate={updateHandler}
    />
  );
};

export default ClassGroupListIndex;
