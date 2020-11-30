import React from 'react';

import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core';

import GroupIndex from 'pages/groups/group';
import GroupListIndex from 'pages/groups/groupList';
import groupsPageOptions from 'pages/groups/pageOptions';

import withPage from 'components/withPage';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const GroupsIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
          <GroupListIndex />
        </Grid>
        <Hidden xsDown>
          <Grid item sm={6} md={7} lg={8} xl={9}>
            <GroupIndex />
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};

export default withPage(groupsPageOptions)(GroupsIndex);
