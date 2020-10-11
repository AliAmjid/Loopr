import React from 'react';

import { Box, Grid, Hidden } from '@material-ui/core';

import GeneralInformation from './generalInformation';
import Groups from './groups';
import PersonalInformation from './personalInformation';
import Subjects from './subjects';

const UserDetail: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xl={3} md={6} xs={12}>
          <Box display="flex" flexDirection="column">
            <Box mb={2}>
              <GeneralInformation />
            </Box>
            <Hidden xlUp>
              <PersonalInformation />
            </Hidden>
          </Box>
        </Grid>
        <Hidden lgDown>
          <Grid item xl={3} lg={6}>
            <PersonalInformation />
          </Grid>
        </Hidden>
        <Grid item xl={3} md={6} xs={12}>
          <Box display="flex" flexDirection="column">
            <Box mb={2}>
              <Groups />
            </Box>
            <Hidden xlUp>
              <Subjects />
            </Hidden>
          </Box>
        </Grid>
        <Hidden lgDown>
          <Grid item xl={3}>
            <Subjects />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default UserDetail;
