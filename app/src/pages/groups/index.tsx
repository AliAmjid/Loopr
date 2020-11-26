import React from 'react';

import { Grid, makeStyles, Paper } from '@material-ui/core';

import groupsPageOptions from 'pages/groups/pageOptions';

import SideTable from 'components/SideTable';
import Tabs from 'components/Tabs';
import withPage from 'components/withPage';

import Classes from './classes';

const useStyles = makeStyles({
  paper: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
});

const GroupsIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={3}>
          <SideTable />
        </Grid>
        <Grid item xs={9}>
          <Tabs
            tabs={[
              { id: 0, label: 'A', Panel: <Classes /> },
              { id: 1, label: 'A', Panel: <>a</> },
              { id: 2, label: 'A', Panel: <>a</> },
            ]}
            variant="fullWidth"
          >
            ahoj
          </Tabs>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withPage(groupsPageOptions)(GroupsIndex);
