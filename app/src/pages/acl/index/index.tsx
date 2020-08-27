import React from 'react';

import { useQuery } from '@apollo/client';
import { Column } from 'material-table';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { AclTableQuery } from 'types/graphql';

import withPage from 'components/withPage';

import ACL_TABLE_QUERY from './queries/aclTable';
import Acl from './Acl';
import aclPageOptions from './pageOptions';

const AclIndex: React.FC = () => {
  const { data } = useQuery<AclTableQuery>(ACL_TABLE_QUERY);
  const { t } = useTranslation(namespaces.pages.acl.index);

  const columns: Column<any>[] = [
    { title: t('resources'), field: 'name' },
    ...(data?.aclRoles?.map(role => ({
      title: role?.name,
      type: 'boolean' as 'boolean',
      field: role?.id,
      filtering: false,
      sorting: false,
    })) || []),
  ];
  const rows =
    data?.aclResources?.map(resource => {
      const row: Record<string, any> = {};
      data?.aclRoles?.forEach(role => {
        const roleResource = role?.resources?.find(
          roleResource => roleResource?.id === resource?.id,
        );
        row[role?.id ?? ''] = Boolean(roleResource);
      });

      return { ...row, name: resource?.name };
    }) || [];

  return <Acl columns={columns} rows={rows} />;
};

export default withPage(aclPageOptions)(AclIndex);
