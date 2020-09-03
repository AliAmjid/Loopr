import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import routes from 'config/routes';

import EditRole from 'pages/acl/editRole/editRole';
import ACL_EDIT_ROLE_UPDATE_ROLE from 'pages/acl/editRole/mutations/updateRole';
import editRolePageOptions from 'pages/acl/editRole/pageOptions';

import {
  AclEditRoleAclRole,
  AclEditRoleAclRoleVariables,
  AclEditRoleUpdateRole,
  AclEditRoleUpdateRoleVariables,
} from 'types/graphql';

import withPage from 'components/withPage';

import ACL_EDIT_ROLE_ACL_ROLE_QUERY from './queries/aclRole';
import { FormValues } from './types';

const EditRoleIndex: React.FC = () => {
  const router = useRouter();
  const { data: aclRoleData, loading: aclRoleLoading } = useQuery<
    AclEditRoleAclRole,
    AclEditRoleAclRoleVariables
  >(ACL_EDIT_ROLE_ACL_ROLE_QUERY, {
    variables: { id: router.query.id?.toString() || '' },
  });
  const [updateRole, { loading: updateRoleLoading }] = useMutation<
    AclEditRoleUpdateRole,
    AclEditRoleUpdateRoleVariables
  >(ACL_EDIT_ROLE_UPDATE_ROLE);
  const { enqueueSnackbar } = useSnackbar();
  const submitHandler = (values: FormValues): void => {
    updateRole({
      variables: {
        id: router.query.id?.toString() || '',
        name: values.name,
      },
    })
      .then(() => {
        enqueueSnackbar('success', { variant: 'success' });
        router.push(routes.acl.index);
      })
      .catch(() => {
        enqueueSnackbar('error', { variant: 'error' });
      });
  };

  return (
    <EditRole
      loading={aclRoleLoading || updateRoleLoading}
      role={{ name: aclRoleData?.aclRole?.name || '' }}
      onSubmit={submitHandler}
    />
  );
};

export default withPage(editRolePageOptions)(EditRoleIndex);
