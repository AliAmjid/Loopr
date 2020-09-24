import React from 'react';

import { useMutation, useQuery } from '@apollo/client';

import USERS_ADD_MANUAL_ACL_ROLES_QUERY from 'pages/users/addManual/queries/roles';
import { NewUser } from 'pages/users/addManual/types';

import {
  UsersAddManualAclRolesQuery,
  UsersAddManualCreateUserMutation,
  UsersAddManualCreateUserMutationVariables,
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

  const addHandler = (user: NewUser): Promise<boolean> => {
    return createUser({ variables: { input: user } })
      .then(() => true)
      .catch(() => false);
  };

  return (
    <AddManual
      roles={roles?.aclRoles || []}
      loading={rolesLoading}
      onAdd={addHandler}
    />
  );
};

export default withPage(addManualPageOptions)(AddManualIndex);
