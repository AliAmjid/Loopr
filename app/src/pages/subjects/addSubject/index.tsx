import React from 'react';

import { Paper } from '@material-ui/core';

import Stepper from 'components/Stepper';
import withPage from 'components/withPage';

import GroupsIndex from './groups';
import addSubjectPageOptions from './pageOptions';

const AddSubjectIndex: React.FC = () => {
  return (
    <Paper>
      <Stepper
        steps={[
          {
            index: 0,
            label: 'A',
            component: <GroupsIndex />,
            nextActive: true,
          },
          { index: 1, label: 'B', component: <>ahoj</>, nextActive: true },
        ]}
      />
    </Paper>
  );
};

export default withPage(addSubjectPageOptions)(AddSubjectIndex);
