import React from 'react';

import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import MaterialTable from 'lib/material-table';

import groupsPageOptions from 'pages/classes/pageOptions';

import SideTable from 'components/SideTable';
import withPage from 'components/withPage';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const Classes: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
          <SideTable
            title="Groups"
            bottomAction={{ icon: <AddIcon />, onClick: () => {} }}
            items={[
              {
                id: 0,
                primary: 'DVOP Matematika',
                secondary: '4.A, 4.B, 4.C',
                selected: true,
              },
              { id: 1, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 2, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 3, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 4, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 5, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 6, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 7, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 8, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              { id: 9, primary: 'DVOP Matematika', secondary: '4.A, 4.B, 4.C' },
              {
                id: 10,
                primary: 'DVOP Matematika',
                secondary: '4.A, 4.B, 4.C',
              },
              {
                id: 11,
                primary: 'DVOP Matematika',
                secondary: '4.A, 4.B, 4.C',
              },
            ]}
          />
        </Grid>
        <Grid item xs={false} sm={6} md={7} lg={8} xl={9}>
          <Box p={2}>
            <MaterialTable
              uniqueName="pages/groups/index"
              title="Students"
              columns={[]}
              data={[
                { name: 'A', surname: 'AA' },
                { name: 'B', surname: 'BB' },
                { name: 'C', surname: 'CC' },
              ]}
              defaultActions={{
                columnFiltering: {
                  active: true,
                  defaultColumns: ['name'],
                  columns: [{ title: 'Name', field: 'name' }],
                },
              }}
              options={{ exportButton: true }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withPage(groupsPageOptions)(Classes);
