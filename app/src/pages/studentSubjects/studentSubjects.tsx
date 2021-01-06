import React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  Theme,
  Typography,
} from '@material-ui/core';

import withPage from 'components/withPage';

import studentSubjectPageOptions from './pageOptions';
import PointSystem from './pointSystem';

const StudentSubjects: React.FC = () => {
  return (
    <Paper>
      <Box display="flex">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card variant="outlined">
              <PointSystem />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <PointSystem />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <PointSystem />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <PointSystem />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant="outlined">
              <PointSystem />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default withPage(studentSubjectPageOptions)(StudentSubjects);
