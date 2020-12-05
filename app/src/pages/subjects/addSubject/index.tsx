import React from 'react';

import { Paper } from '@material-ui/core';

import useAddSubjectState from 'pages/subjects/addSubject/state';

import Stepper from 'components/Stepper';
import withPage from 'components/withPage';

import GroupsIndex from './groups';
import addSubjectPageOptions from './pageOptions';

const AddSubjectIndex: React.FC = () => {
  const { group, classGroup, teacher } = useAddSubjectState(state => ({
    group: state.group,
    classGroup: state.classGroup,
    teacher: state.teacher,
  }));

  return (
    <Paper>
      <Stepper
        steps={[
          {
            index: 0,
            label: 'Group/ClassGroup',
            component: <GroupsIndex />,
            nextActive: group !== undefined || classGroup !== undefined,
          },
          { index: 1, label: 'B', component: <>ahoj</>, nextActive: true },
        ]}
      />
    </Paper>
  );
};

export default withPage(addSubjectPageOptions)(AddSubjectIndex);