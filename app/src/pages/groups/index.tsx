import React from 'react';

import { makeStyles, Paper } from '@material-ui/core';

import GroupIndex from 'pages/groups/group';
import GroupListIndex from 'pages/groups/groupList';
import groupsPageOptions from 'pages/groups/pageOptions';

import SideListGrid from 'components/SideList/grid';
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
      <SideListGrid sideList={<GroupListIndex />} body={<GroupIndex />} />
    </Paper>
  );
};

export default withPage(groupsPageOptions)(GroupsIndex);
