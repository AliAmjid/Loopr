import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import USERS_ADD_MANUAL_UPDATE_USER from 'pages/users/addManual/mutations/updateUser';
import USERS_ADD_MANUAL_ACL_ROLES_QUERY from 'pages/users/addManual/queries/roles';
import {
  AddUser,
  HandlerReturn,
  NewUser,
  Role,
} from 'pages/users/addManual/types';

import {
  UsersAddManualAclRolesQuery,
  UsersAddManualCreateUserMutation,
  UsersAddManualCreateUserMutationVariables,
  UsersAddManualUpdateUser,
  UsersAddManualUpdateUserVariables,
} from 'types/graphql';

import withPage from 'components/withPage';

import USERS_ADD_MANUAL_CREATE_USER_MUTATION from './mutations/createUser';
import AddManual from './AddManual';
import addManualPageOptions from './pageOptions';

const AddManualIndex: React.FC = () => {
  const { data: roles, loading: rolesLoading } = useQuery<
    UsersAddManualAclRolesQuery
  >(USERS_ADD_MANUAL_ACL_ROLES_QUERY);
  const [createUser] = useMutation<
    UsersAddManualCreateUserMutation,
    UsersAddManualCreateUserMutationVariables
  >(USERS_ADD_MANUAL_CREATE_USER_MUTATION);
  const [updateUser] = useMutation<
    UsersAddManualUpdateUser,
    UsersAddManualUpdateUserVariables
  >(USERS_ADD_MANUAL_UPDATE_USER);
  const { enqueueSnackbar } = useSnackbar();

  const addHandler = (user: AddUser): Promise<HandlerReturn> => {
    return createUser({ variables: { input: user } })
      .then(data => {
        enqueueSnackbar('add success', { variant: 'success' });

        return {
          id: data?.data?.createUser?.user?.id || '',
          success: true,
        };
      })
      .catch(() => {
        enqueueSnackbar('error', { variant: 'error' });

        return { id: '__error__', success: false };
      });
  };

  const updateHandler = (user: NewUser): Promise<boolean> => {
    return updateUser({ variables: { input: user } })
      .then(() => {
        enqueueSnackbar('update success', { variant: 'success' });

        return true;
      })
      .catch(() => {
        enqueueSnackbar('error', { variant: 'error' });

        return false;
      });
  };

  return (
    <AddManual
      roles={(roles?.aclRoles as Role[]) || []}
      loading={rolesLoading}
      onAdd={addHandler}
      onUpdate={updateHandler}
    />
  );
};

export default withPage(addManualPageOptions)(AddManualIndex);
