import React from 'react';

import { Box, Button } from '@material-ui/core';

import MaterialTable from 'lib/material-table';

const Subject: React.FC = () => {
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
