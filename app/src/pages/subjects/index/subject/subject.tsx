import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';

import MaterialTable from 'lib/material-table';

import { SubjectProps } from './types';

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
        uniqueName="pages/subjects/subject/subject"
        columns={[]}
        data={[]}
      />
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Subject;
