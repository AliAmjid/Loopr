import React from 'react';

import { makeStyles, Paper } from '@material-ui/core';

import SideListGrid from 'components/SideList/grid';
import withPage from 'components/withPage';

import subjectsPageOptions from './pageOptions';
import SubjectList from './subjectList';

const useStyles = makeStyles({
  paper: {
    padding: 0,
  },
});

const SubjectsIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <SideListGrid sideList={<SubjectList />} body={<>ahoj</>} />
    </Paper>
  );
};

export default withPage(subjectsPageOptions)(SubjectsIndex);
