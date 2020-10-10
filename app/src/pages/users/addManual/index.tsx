import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
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

import UserImportTable from 'components/UserImportTable';
import withPage from 'components/withPage';

import USERS_ADD_MANUAL_CREATE_USER_MUTATION from './mutations/createUser';
import AddManual from './AddManual';
import addManualPageOptions from './pageOptions';

const AddManualIndex: React.FC = () => {
  return (
    <Paper>
      <UserImportTable />
    </Paper>
  );
};

export default withPage(addManualPageOptions)(AddManualIndex);
