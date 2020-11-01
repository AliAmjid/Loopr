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
          { title: t('firstName'), field: 'firstname' },
          { title: t('lastName'), field: 'lastname' },
          { title: t('email'), field: 'email' },
          { title: t('role'), field: 'role', lookup: props.rolesLookup },
        ]}
        data={props.users}
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
            <Button
              color="secondary"
              variant="contained"
              onClick={props.onSubmit}
            >
              {t('finish')}
            </Button>
          </Link>
        </Box>
        <Button color="primary" variant="contained" onClick={props.onSubmit}>
          {t('upload')}
        </Button>
      </Box>
    </>
  );
};

export default UserImportTableUI;
