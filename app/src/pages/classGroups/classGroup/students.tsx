import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { DetailClassGroupUser, StudentsProps } from './types';

const Students: React.FC<StudentsProps> = props => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <MaterialTable
        key={`${props.selectedClassGroup}-${editing}`}
        uniqueName="pages/classGroups/classGoup/students"
        title="USERS"
        data={(query: Query<DetailClassGroupUser>) =>
          editing
            ? props.onGetUsers(query).then(res => ({
                page: query.page,
                totalCount: res.totalCount,
                data: res.users,
              }))
            : props.onGetClassGroupUsers(query).then(res => ({
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
        columns={[]}
        defaultActions={{
          columnFiltering: {
            active: true,
            columns: [
              { title: 'email', field: 'email' },
              { title: 'Name', field: 'firstname' },
              { title: 'lastname', field: 'lastname' },
            ],
            defaultColumns: ['firstname', 'lastname', 'email'],
          },
        }}
        options={{ selection: editing }}
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
    </>
  );
};

export default Students;
