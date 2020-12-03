import React, { useState } from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { ClassGroupProps, DetailClassGroupUser } from './types';

const ClassGroup: React.FC<ClassGroupProps> = props => {
  const [editing, setEditing] = useState(false);

  if (!props.selectedClassGroup)
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>No class selected</Typography>
      </Box>
    );

  return (
    <Box p={2}>
      <MaterialTable
        key={props.selectedClassGroup + editing}
        uniqueName="pages/classes/class"
        title="USERS"
        data={(query: Query<DetailClassGroupUser>) =>
          editing
            ? props.getUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
            : props.getClassGroupUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
        }
        onSelectionChange={(data, row) => {
          if (row) {
            props.onSelectionChange({
              id: row?.id,
              selected: row?.tableData?.checked || false,
            });
          }
        }}
        columns={[
          { title: 'Name', field: 'firstname' },
          { title: 'lastname', field: 'lastname' },
        ]}
        options={{ selection: editing, pageSize: 2, pageSizeOptions: [2] }}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        {editing ? (
          <>
            <Box pr={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  props.onSubmit();
                  setEditing(false);
                }}
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

export default ClassGroup;
