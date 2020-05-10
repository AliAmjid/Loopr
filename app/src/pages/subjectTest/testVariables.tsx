import React from 'react';

import { TextField } from '@material-ui/core';

import { TestVariablesProps } from 'pages/subjectTest/types';

const TestVariables = (props: TestVariablesProps): JSX.Element => {
  const mappedTestVariables = props.testVariables.map(testVariable => (
    <TextField
      key={testVariable.name}
      label={testVariable.label}
      value={testVariable.value}
      onChange={e =>
        props.onTestVariableUpdate(testVariable.name, e.target.value)
      }
    />
  ));

  return <>{mappedTestVariables}</>;
};

export default TestVariables;
