import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';

import MaterialTable from 'lib/material-table';

import { GroupProps } from './types';

const Group: React.FC<GroupProps> = props => {
  if (!props.group)
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>No group selected</Typography>
      </Box>
    );

  return (
    <Box p={2}>
      <MaterialTable
        uniqueName="pages/groups/group"
        title="USERS"
        isLoading={props.loading}
        data={props.group?.users || []}
        columns={[
          { title: 'Name', field: 'firstname' },
          { title: 'lastname', field: 'lastname' },
        ]}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained">
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default Group;
