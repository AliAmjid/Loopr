import React, { useState } from 'react';

import { Box, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { bool } from 'prop-types';

import MaterialTable from 'lib/material-table';

import SideTable from 'components/SideTable';
import withPage from 'components/withPage';

import AddDialog from './addDialog';
import groupsPageOptions from './pageOptions';
import { GroupsProps } from './types';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const Groups: React.FC<GroupsProps> = props => {
  const classes = useStyles();

  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <AddDialog
        open={addOpen}
        onSubmit={values => {
          props.onAdd(values).then((success: boolean) => {
            if (success) setAddOpen(false);
          });
        }}
        onClose={() => {
          setAddOpen(false);
        }}
      />
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
            <SideTable
              title="Groups"
              bottomAction={{
                icon: <AddIcon />,
                onClick: () => {
                  setAddOpen(true);
                },
              }}
              items={[
                {
                  id: 0,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                  onValueChange: () => {},
                  additionalActions: [
                    <IconButton key={0}>
                      <DeleteIcon />
                    </IconButton>,
                  ],
                },
                {
                  id: 1,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 2,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 3,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 4,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 5,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 6,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 7,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 8,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
                {
                  id: 9,
                  primary: 'DVOP Matematika',
                  secondary: '4.A, 4.B, 4.C',
                },
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
    </>
  );
};

export default Groups;
