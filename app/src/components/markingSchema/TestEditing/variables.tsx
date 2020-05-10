import React from 'react';

import { TextField } from '@material-ui/core';

import { TestVariablesProps } from './types';

const Variables = (props: TestVariablesProps): JSX.Element => {
  const mappedTestVariables = props.variables.map(testVariable => (
    <div key={testVariable.name}>
      <TextField
        label={testVariable.label}
        value={testVariable.value}
        onChange={e =>
          props.onVariableUpdate(testVariable.name, e.target.value)
        }
      />
    </div>
  ));

  return <>{mappedTestVariables}</>;
};

export default Variables;
