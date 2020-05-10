import React from 'react';

import TestEditing from './testEditing';
import { TestEditingIndexProps } from './types';

const TestEditingIndex = (props: TestEditingIndexProps): JSX.Element => {
  return (
    <>
      <TestEditing
        markingSchema={props.markingSchema}
        testData={props.testData}
      />
    </>
  );
};

export default TestEditingIndex;
