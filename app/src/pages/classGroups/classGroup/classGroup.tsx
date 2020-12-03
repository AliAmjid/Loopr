import React from 'react';

import { Box, Typography } from '@material-ui/core';

import Teacher from 'pages/classGroups/classGroup/teacher';

import Tabs from 'components/Tabs';

import Students from './students';
import { ClassGroupProps } from './types';

const TabWrapper: React.FC = props => (
  <Box p={2} pt={0}>
    {props.children}
  </Box>
);

const ClassGroup: React.FC<ClassGroupProps> = props => {
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
    <Tabs
      variant="fullWidth"
      TabWrapper={TabWrapper}
      tabs={[
        {
          id: 0,
          label: 'students',
          Panel: (
            <Students
              selectedClassGroup={props.selectedClassGroup}
              onGetUsers={props.onGetUsers}
              onGetClassGroupUsers={props.onGetClassGroupUsers}
              onSelectionChange={props.onStudentsChange}
              onSubmit={props.onStudentsSubmit}
            />
          ),
        },
        {
          id: 1,
          label: 'teachers',
          Panel: (
            <Teacher
              teacher={props.teacher}
              onGetUsers={props.onGetUsers}
              onChange={props.onTeacherChange}
            />
          ),
        },
      ]}
    />
  );
};

export default ClassGroup;
