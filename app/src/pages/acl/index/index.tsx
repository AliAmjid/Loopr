import React from 'react';

import { ApolloCache, gql, useMutation, useQuery } from '@apollo/client';
import { Column } from 'material-table';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import ACL_CREATE_ACL_ROLE, {
  aclCreateAclRoleUpdate,
} from 'pages/acl/index/mutations/createAclRole';

import {
  AclCreateAclRole,
  AclCreateAclRoleVariables,
  AclTableQuery,
  AclUpdateAcl,
  AclUpdateAclVariables,
} from 'types/graphql';

import withPage from 'components/withPage';

import ACL_UPDATE_ACL_MUTATION from './mutations/updateAcl';
import ACL_TABLE_QUERY from './queries/aclTable';
import Acl from './Acl';
import aclPageOptions from './pageOptions';
import { OnResourceChangeProps } from './types';

const AclIndex: React.FC = () => {
  const { data } = useQuery<AclTableQuery>(ACL_TABLE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const [updateAcl] = useMutation<AclUpdateAcl, AclUpdateAclVariables>(
    ACL_UPDATE_ACL_MUTATION,
  );
  const [addRole, { loading: addRoleLoading }] = useMutation<
    AclCreateAclRole,
    AclCreateAclRoleVariables
  >(ACL_CREATE_ACL_ROLE, {
    update: aclCreateAclRoleUpdate,
  });
  const { t } = useTranslation(namespaces.pages.acl.index);
  const { enqueueSnackbar } = useSnackbar();

  const columns: Column<any>[] = [
    { title: t('resources'), field: 'name', editable: 'never' },
    ...(data?.aclRoles?.map(role => ({
      title: role?.name,
      type: 'boolean' as 'boolean',
      field: role?.id,
      filtering: false,
      sorting: false,
    })) || []),
  ];
  const rows: any & { name: string; resourceId: string } =
    data?.aclResources?.map(resource => {
      const row: Record<string, any> = {};
      data?.aclRoles?.forEach(role => {
        const roleResource = role?.resources?.find(
          roleResource => roleResource?.id === resource?.id,
        );
        row[role?.id ?? ''] = Boolean(roleResource);
      });

      return { ...row, name: resource?.name, resourceId: resource?.id };
    }) || [];

  const resourceChangeHandler = (
    props: OnResourceChangeProps,
  ): Promise<boolean> => {
    return updateAcl({
      variables: { id: props.roleId, resources: [props.resourceId] },
    })
      .then(() => true)
      .catch(() => {
        enqueueSnackbar(t('failedToUpdate'), { variant: 'error' });

        return false;
      });
  };

  const roleAddHandler = (): void => {
    addRole({ variables: { input: { name: 'ROLE_NEW' } } });
  };

  return (
    <Acl
      columns={columns}
      rows={rows}
      onResourceChange={resourceChangeHandler}
      onRoleAdd={roleAddHandler}
      addRoleLoading={addRoleLoading}
    />
  );
};

export default withPage(aclPageOptions)(AclIndex);
