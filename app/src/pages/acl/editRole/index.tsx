import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { bool } from 'prop-types';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import EditRole from 'pages/acl/editRole/EditRole';
import ACL_EDIT_ROLE_DELETE_ACL_ROLE_MUTATION from 'pages/acl/editRole/mutations/deleteRole';
import ACL_EDIT_ROLE_UPDATE_ROLE from 'pages/acl/editRole/mutations/updateRole';
import editRolePageOptions from 'pages/acl/editRole/pageOptions';

import {
  AclEditRoleAclRole,
  AclEditRoleAclRoleVariables,
  AclEditRoleDeleteAclRoleMutation,
  AclEditRoleDeleteAclRoleMutationVariables,
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
  const [deleteRole, { loading: deleteRoleLoading }] = useMutation<
    AclEditRoleDeleteAclRoleMutation,
    AclEditRoleDeleteAclRoleMutationVariables
  >(ACL_EDIT_ROLE_DELETE_ACL_ROLE_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(namespaces.pages.acl.editRole);

  const submitHandler = (values: FormValues): void => {
    updateRole({
      variables: {
        id: router.query.id?.toString() || '',
        name: values.name,
      },
    }).then(() => {
      enqueueSnackbar(t('success'), { variant: 'success' });
      router.push(routes.acl.index);
    });
  };

  const deleteHandler = (): Promise<boolean> => {
    return deleteRole({ variables: { input: { id: `${router.query.id}` } } })
      .then(() => {
        enqueueSnackbar(t('deleteSuccess'), { variant: 'success' });
        router.push(routes.acl.index);

        return true;
      })
      .catch(() => {
        return false;
      });
  };

  return (
    <EditRole
      loading={aclRoleLoading || updateRoleLoading}
      role={{ name: aclRoleData?.aclRole?.name || '' }}
      onSubmit={submitHandler}
      onDelete={deleteHandler}
    />
  );
};

export default withPage(editRolePageOptions)(EditRoleIndex);
