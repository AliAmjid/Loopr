import React from 'react';

import { Box, Button } from '@material-ui/core';

import MaterialTable from 'lib/material-table';

import { UserUploadProps } from './types';

const UserUpload: React.FC<UserUploadProps> = props => {
  return (
    <>
      <MaterialTable
        columns={[
          { title: 'email', field: 'email' },
          { title: 'name', field: 'name' },
          { title: 'role', field: 'role' },
        ]}
        isLoading={props.loading}
        data={props.rows}
        options={{ selection: true }}
        onSelectionChange={props.onSelectedChange}
      />
      <Box display="flex" justifyContent="flex-end" pt={2}>
        <Button color="primary" variant="contained" onClick={props.onSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default UserUpload;
