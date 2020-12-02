import React from 'react';

import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core';

import withPage from 'components/withPage';

import ClassIndex from './class';
import ClassesListIndex from './classList';
import classesPageOptions from './pageOptions';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const ClassesIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
          <ClassesListIndex />
        </Grid>
        <Hidden xsDown>
          <Grid item sm={6} md={7} lg={8} xl={9}>
            <ClassIndex />
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};

export default withPage(classesPageOptions)(ClassesIndex);
