import React from 'react';

import { Box, Button } from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';
import MaterialTable from 'lib/material-table';

import { User, UserImportTableUIProps, UsersWithId, UserWithId } from './types';

const UserImportTableUI: React.FC<UserImportTableUIProps> = props => {
  const { t } = useTranslation(namespaces.components.UserImportTable);

  return (
    <>
      <MaterialTable
        title={t('tableTitle')}
        uniqueName="components/UserImportTable/UserImportTableUI"
        isLoading={props.loading}
        columns={[
          { title: t('common:gqlObjects.user.firstname'), field: 'firstname' },
          { title: t('common:gqlObjects.user.lastname'), field: 'lastname' },
          { title: t('common:gqlObjects.user.email'), field: 'email' },
          {
            title: t('common:gqlObjects.user.role'),
            field: 'role',
            lookup: props.rolesLookup,
          },
        ]}
        data={props.users.map(u => u)}
        options={{
          selection: true,
        }}
        onSelectionChange={(users: UsersWithId) =>
          props.onSelectionChange(users)
        }
        editable={{
          onRowAdd: (user: User) =>
            new Promise(resolve => {
              props.onRowAdd(user);
              resolve();
            }),
          onRowUpdate: (user: UserWithId) =>
            new Promise(resolve => {
              props.onRowUpdate(user);
              resolve();
            }),
          onRowDelete: (user: UserWithId) =>
            new Promise(resolve => {
              props.onRowDelete(user);
              resolve();
            }),
        }}
      />
      <Box display="flex" justifyContent="flex-end" pt={2}>
        <Box pr={2}>
          <Link href={routes.users.index} passHref>
            <Button color="primary" onClick={props.onSubmit}>
              {t('common:actions.cancel')}
            </Button>
          </Link>
        </Box>
        <Button color="primary" variant="contained" onClick={props.onSubmit}>
          {t('common:actions.upload')}
        </Button>
      </Box>
    </>
  );
};

export default UserImportTableUI;
