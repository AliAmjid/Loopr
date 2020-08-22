import React from 'react';

import { Paper } from '@material-ui/core';

import MaterialTable from 'lib/material-table';

const Users = (): JSX.Element => {
  return (
    <Paper>
      <MaterialTable
        title="Seznam uživatelů"
        columns={[{ title: 'Jméno', field: 'name' }]}
        data={[{ name: 'AHOJ' }]}
        options={{ exportButton: true }}
      />
    </Paper>
  );
};

export default Users;
