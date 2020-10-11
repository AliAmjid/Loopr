import React from 'react';

import { Box, Button } from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import MaterialTable from 'lib/material-table';

import { User, UserImportTableUIProps, UsersWithId, UserWithId } from './types';

const UserImportTableUI: React.FC<UserImportTableUIProps> = props => {
  return (
    <>
      <MaterialTable
        isLoading={props.loading}
        columns={[
          { title: 'name', field: 'name' },
          { title: 'email', field: 'username' },
          { title: 'role', field: 'role', lookup: props.rolesLookup },
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
              Finish
            </Button>
          </Link>
        </Box>
        <Button color="primary" variant="contained" onClick={props.onSubmit}>
          Upload
        </Button>
      </Box>
    </>
  );
};

export default UserImportTableUI;
