import React from 'react';

import { Grid, TextField, Typography } from '@material-ui/core';

import { SubjectVariablesProps } from './types';

const GlobalVariables = (props: SubjectVariablesProps): JSX.Element => {
  const mappedVariables = props.subjectVariables.map(variable => (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">{variable.label}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`$${variable.name}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField type="text" />
        </Grid>
      </Grid>
    </div>
  ));

  return <>{mappedVariables}</>;
};

export default GlobalVariables;
