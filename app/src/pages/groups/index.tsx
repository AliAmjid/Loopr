import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import withPage from 'components/withPage';

import GROUPS_ADD_GROUP_MUTATION from './mutations/addGroup';
import Groups from './groups';
import groupsPageOptions from './pageOptions';
import { AddValues } from './types';

const GroupsIndex: React.FC = () => {
  const [addGroup, { loading: addGroupLoading }] = useMutation(
    GROUPS_ADD_GROUP_MUTATION,
  );
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

  return <Groups onAdd={addHandler} />;
};

export default withPage(groupsPageOptions)(GroupsIndex);
