import React from 'react';

import {
  Avatar,
  Box,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
  },
}));

const GeneralInformationIndex: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Box display="flex">
        <Box pr={2}>
          <Avatar className={classes.avatar} variant="rounded">
            AJ
          </Avatar>
        </Box>
        <Box>
          <Typography variant="h5">Adam Janov</Typography>
          <Typography>Student</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default GeneralInformationIndex;
