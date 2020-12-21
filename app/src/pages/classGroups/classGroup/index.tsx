import React from 'react';

import useClassGroupsState from '../state';

import ClassGroup from './classGroup';

const ClassIndex: React.FC = () => {
  const { selectedClassGroup } = useClassGroupsState(state => ({
    selectedClassGroup: state.selectedClassGroup,
  }));

  return <ClassGroup selectedClassGroup={selectedClassGroup} />;
};

export default ClassIndex;
