import React from 'react';

import { makeStyles, Paper } from '@material-ui/core';

import SideListGrid from 'components/SideList/grid';
import withPage from 'components/withPage';

import ClassIndex from './classGroup';
import ClassGroupListIndex from './classGroupList';
import classGroupsPageOptions from './pageOptions';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const ClassGroupsIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <SideListGrid sideList={<ClassGroupListIndex />} body={<ClassIndex />} />
    </Paper>
  );
};

export default withPage(classGroupsPageOptions)(ClassGroupsIndex);
