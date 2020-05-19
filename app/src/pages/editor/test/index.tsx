import React from 'react';

import Test from './test';
import { TestIndexProps } from './types';

const TestIndex = (props: TestIndexProps): JSX.Element => {
  return (
    <>
      <Test testColumns={props.testColumns} onAddClick={props.onAddClick} />
    </>
  );
};

export default TestIndex;
