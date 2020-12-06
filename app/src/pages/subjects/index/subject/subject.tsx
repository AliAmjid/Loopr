import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { Query } from 'material-table';

import MaterialTable from 'lib/material-table';

import { Subject as SubjectT, SubjectProps } from './types';

const Subject: React.FC<SubjectProps> = props => {
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
      <MaterialTable
        key={props.selectedSubject}
        uniqueName="pages/subjects/subject/subject"
        columns={[]}
        data={(query: Query<SubjectT>) =>
          props.onGetSubjects(query).then(res => ({
            totalCount: res.totalCount,
            data: res.subjects,
            page: query.page,
          }))
        }
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
