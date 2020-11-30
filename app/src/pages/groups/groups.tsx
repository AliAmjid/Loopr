import React, { useState } from 'react';

import { Grid, makeStyles, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import GroupIndex from 'pages/groups/group';

import SideTable from 'components/SideTable';

import AddDialog from './addDialog';
import { GroupsProps } from './types';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const Groups: React.FC<GroupsProps> = props => {
  const classes = useStyles();

  const [addOpen, setAddOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(
    undefined,
  );

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
              loading={props.groupsLoading}
              bottomAction={{
                icon: <AddIcon />,
                onClick: () => {
                  setAddOpen(true);
                },
              }}
              items={props.groups.map(group => ({
                id: group.id,
                primary: `${group?.year} ${group?.section}`,
                onClick: () => {
                  setSelectedGroup(group.id);
                },
              }))}
            />
          </Grid>
          <Grid item xs={false} sm={6} md={7} lg={8} xl={9}>
            <GroupIndex selectedGroup={selectedGroup} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Groups;
