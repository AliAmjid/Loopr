import React from 'react';

import {
  Box,
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
}));

const PointSystem: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <SubjectCell className={`${classes.cellWithoutBorder}`} align="center">
          <Typography variant="subtitle1">Anglický jazyk</Typography>
        </SubjectCell>
        <TableCell align="center" className={`${classes.cellWithoutBorder}`}>
          <Typography variant="subtitle1">10/20</Typography>
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow>
        <SubjectCell
          align="center"
          className={`${classes.cellWithoutBorder} ${classes.cellSmallPadding}`}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2">Počet bodů</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="body2">70/100</Typography>
              </Box>
            </Grid>
          </Grid>
        </SubjectCell>
        <TableCell
          align="center"
          className={`${classes.cellWithoutBorder} ${classes.cellSmallPadding}`}
        >
          <Typography variant="body2">UNIT test 2</Typography>
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow>
        <SubjectCell
          align="center"
          className={`${classes.cellWithoutBorder} ${classes.cellSmallPadding}`}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2">Procentuálně</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="body2">70%</Typography>
              </Box>
            </Grid>
          </Grid>
        </SubjectCell>
        <TableCell
          align="center"
          className={`${classes.cellWithoutBorder} ${classes.cellSmallPadding}`}
        >
          <Typography variant="body2">27. 7. 2020</Typography>
        </TableCell>
        <TableCell />
      </TableRow>
      <TableRow>
        <SubjectCell align="center" className={`${classes.cellSmallPadding}`}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2">Známka</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="body2">3</Typography>
              </Box>
            </Grid>
          </Grid>
        </SubjectCell>
        <TableCell align="center" className={`${classes.cellSmallPadding}`}>
          <Typography variant="body2">1</Typography>
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
};

export default PointSystem;
