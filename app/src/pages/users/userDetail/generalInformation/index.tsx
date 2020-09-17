import React, { useState } from 'react';

import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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

  const [state, setState] = useState({ editing: false });

  return (
    <Paper>
      <Box display="flex">
        <Box pr={2}>
          <Avatar className={classes.avatar} variant="rounded">
            AJ
          </Avatar>
        </Box>
        <Box display="flex" width="100%">
          <Box flexGrow={1}>
            {state.editing ? (
              <div>
                <TextField defaultValue="Adam Janov" />
              </div>
            ) : (
              <Typography variant="h5">Adam Janov</Typography>
            )}
            {state.editing ? (
              <div>
                <Select defaultValue={0}>
                  <MenuItem value={0}>Student</MenuItem>
                </Select>
              </div>
            ) : (
              <Typography>Student</Typography>
            )}
          </Box>
          <Box>
            <IconButton
              onClick={() =>
                setState(prevState => ({
                  ...prevState,
                  editing: !prevState.editing,
                }))
              }
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default GeneralInformationIndex;
