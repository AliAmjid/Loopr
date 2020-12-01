import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { DetailGroupUser, GroupProps } from './types';

const Group: React.FC<GroupProps> = props => {
  if (!props.selectedGroup)
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
        key={props.selectedGroup}
        uniqueName="pages/groups/group"
        title="USERS"
        data={(query: Query<DetailGroupUser>) =>
          props.getGroupUsers(query).then(res => ({
            page: query.page,
            totalCount: res.totalCount,
            data: res.users,
          }))
        }
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
