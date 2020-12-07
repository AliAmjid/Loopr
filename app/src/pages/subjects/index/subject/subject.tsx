import React, { useState } from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import SimpleDialog from 'components/SimpleDialog';

import { Subject as SubjectT, SubjectProps } from './types';

const Subject: React.FC<SubjectProps> = props => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  if (!props.selectedSubject)
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>No subject selected</Typography>
      </Box>
    );

  return (
    <Box p={2}>
      <SimpleDialog
        open={Boolean(deleteId)}
        title="Sure?"
        content={<Typography>Irreversible</Typography>}
        actions={[
          <Button
            key={0}
            color="primary"
            onClick={() => setDeleteId(undefined)}
          >
            Cancel
          </Button>,
          <Button
            key={1}
            color="primary"
            variant="contained"
            onClick={() => {
              props.onDelete(deleteId).then(successful => {
                if (successful) setDeleteId(undefined);
              });
            }}
          >
            Delete
          </Button>,
        ]}
      />
      <MaterialTable
        key={props.selectedSubject}
        uniqueName="pages/subjects/subject/subject"
        columns={[
          {
            title: 'Group/ClassGroup',
            render: (row: SubjectT) => {
              if (row.classGroup)
                return `${row.classGroup.year} ${row.classGroup.section}`;
              if (row.group) return row.group.section;

              return '-';
            },
          },
          {
            title: 'Teacher',
            render: (row: SubjectT) =>
              `${row.teacher?.firstname} ${row.teacher?.lastname}`,
          },
        ]}
        options={{ filtering: false }}
        data={(query: Query<SubjectT>) =>
          props.onGetSubjects(query).then(res => ({
            totalCount: res.totalCount,
            data: res.subjects,
            page: query.page,
          }))
        }
        actions={[
          {
            icon: DeleteIcon,
            tooltip: 'Delete',
            onClick: (_, row) => {
              row = row as SubjectT;
              setDeleteId(row.id);
            },
          },
        ]}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={props.onAddClick}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Subject;
