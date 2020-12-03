import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { DetailClassGroupUser, TeacherProps } from './types';

const Teacher: React.FC<TeacherProps> = props => {
  const [editing, setEditing] = useState(false);

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <MaterialTable
        key={`${editing}`}
        title="Teacher"
        uniqueName="pages/classGroups/classGroup/teacher"
        data={(() => {
          if (!editing) {
            return props.teacher ? [props.teacher] : [];
          }

          return (query: Query<DetailClassGroupUser>) =>
            props.onGetUsers(query).then(res => ({
              page: query.page,
              totalCount: res.totalCount,
              data: res.users,
            }));
        })()}
        columns={[]}
        defaultActions={{
          columnFiltering: {
            active: true,
            columns: [
              {
                title: 'email',
                field: 'email',
              },
              {
                title: 'firstname',
                field: 'firstname',
              },
              {
                title: 'lastname',
                field: 'lastname',
              },
            ],
            defaultColumns: ['firstname', 'lastname', 'email'],
          },
        }}
        actions={
          editing
            ? [
                {
                  icon: AddIcon,
                  tooltip: 'Select',
                  onClick: (_, row) => {
                    props
                      .onChange(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        row.id,
                      )
                      .then(successful => {
                        if (successful) setEditing(false);
                      });
                  },
                },
              ]
            : []
        }
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        {editing ? (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setEditing(true)}
          >
            Cancel
          </Button>
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
    </OverlayLoadingContainer>
  );
};

export default Teacher;
