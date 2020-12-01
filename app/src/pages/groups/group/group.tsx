import React, { useState } from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { DetailGroupUser, GroupProps } from './types';

const Group: React.FC<GroupProps> = props => {
  const [editing, setEditing] = useState(false);

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
        key={props.selectedGroup + editing}
        uniqueName="pages/groups/group"
        title="USERS"
        data={(query: Query<DetailGroupUser>) =>
          editing
            ? props.getUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
            : props.getGroupUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
        }
        onSelectionChange={data => {
          console.log(data);
        }}
        columns={[
          { title: 'Name', field: 'firstname' },
          { title: 'lastname', field: 'lastname' },
        ]}
        options={{ selection: editing }}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        {editing ? (
          <>
            <Box pr={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setEditing(false)}
              >
                Save
              </Button>
            </Box>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Group;
