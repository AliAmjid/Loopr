import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import {
  ClassesAddClassMutation,
  ClassesAddClassMutationVariables,
  ClassesClassesQuery,
  ClassesUpdateClassMutation,
  ClassesUpdateClassMutationVariables,
} from 'types/graphql';

import CLASSES_ADD_CLASS_MUTATION from '../mutations/addClass';
import CLASSES_UPDATE_CLASS_MUTATION from '../mutations/updateClass';
import CLASSES_CLASSES_QUERY from '../queries/classes';
import useClassesState from '../state';

import ClassList from './classList';
import { AddValues, Class, UpdateValues } from './types';

const ClassListIndex: React.FC = () => {
  const { setSelectedClass } = useClassesState(state => ({
    setSelectedClass: state.setSelectedClass,
  }));
  const { data: classesData, loading: classesLoading } = useQuery<
    ClassesClassesQuery
  >(CLASSES_CLASSES_QUERY);
  const [addClass, { loading: addClassLoading }] = useMutation<
    ClassesAddClassMutation,
    ClassesAddClassMutationVariables
  >(CLASSES_ADD_CLASS_MUTATION, {
    refetchQueries: ['ClassesClassesQuery'],
    awaitRefetchQueries: true,
  });
  const [updateClass] = useMutation<
    ClassesUpdateClassMutation,
    ClassesUpdateClassMutationVariables
  >(CLASSES_UPDATE_CLASS_MUTATION, {
    // TODO typename
    refetchQueries: ['ClassesClassesQuery'],
    awaitRefetchQueries: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  const addHandler = (values: AddValues): Promise<boolean> => {
    return addClass({
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
    return updateClass({
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

  const classes: Class[] = [];
  (classesData?.classGroups?.edges?.map(e => e?.node) || []).forEach(cl => {
    if (cl) {
      classes.push(cl);
    }
  });

  return (
    <ClassList
      classes={classes}
      onAdd={addHandler}
      classesLoading={classesLoading}
      addClassLoading={addClassLoading}
      onSelectedClassChange={(cl: string) => {
        setSelectedClass(cl);
      }}
      onUpdate={updateHandler}
    />
  );
};

export default ClassListIndex;
