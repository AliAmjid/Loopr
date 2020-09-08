import React from 'react';

import { Grid } from '@material-ui/core';

import GeneralInformationIndex from './generalInformation';
import PersonalInformationIndex from './personalInformation';

const UserDetail: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <GeneralInformationIndex />
      </Grid>
      <Grid item xs={3}>
        <PersonalInformationIndex />
      </Grid>
    </Grid>
  );
};

export default UserDetail;
