import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';

import SubjectCell from '../components/subjectCell';

const useStyles = makeStyles((theme: Theme) => ({
  cellWithoutBorder: {
    border: 'none',
  },
  cellSmallPadding: {
    padding: theme.spacing(0.2),
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
}));

const PointSystem: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="subtitle1">Anglický jazyk</Typography>
      </Box>
      <Grid container>
        <Grid item xs={6}>
          <Typography>Celkové body</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>20/100</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography>Celkové procenta</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>20%</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography>Známka</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>5</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" pt={2}>
        <Button color="primary">zobrazit</Button>
      </Box>
    </>
  );
};

export default PointSystem;
