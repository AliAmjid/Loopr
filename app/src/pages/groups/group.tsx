import React from 'react';

import { Box } from '@material-ui/core';

import MaterialTable from 'lib/material-table';

import { GroupProps } from './types';

const Group: React.FC<GroupProps> = props => {
  return (
    <Box p={2}>
      <MaterialTable
        uniqueName="pages/groups/group"
        title="USERS"
        data={props.group?.users || []}
        columns={[
          { title: 'Name', field: 'firstname' },
          { title: 'lastname', field: 'lastname' },
        ]}
      />
    </Box>
  );
};

export default Group;
