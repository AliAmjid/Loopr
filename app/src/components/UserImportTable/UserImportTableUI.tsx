import React from 'react';

import MaterialTable from 'lib/material-table';

import { User, UserImportTableUIProps, UserWithId } from './types';

const UserImportTableUI: React.FC<UserImportTableUIProps> = props => {
  console.log('props', props);

  return (
    <MaterialTable
      isLoading={props.loading}
      columns={[
        { title: 'name', field: 'name' },
        { title: 'email', field: 'username' },
        { title: 'role', field: 'role', lookup: props.rolesLookup },
      ]}
      data={props.users}
      options={{ selection: true }}
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
  );
};

export default UserImportTableUI;
