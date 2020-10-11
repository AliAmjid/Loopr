import React from 'react';

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Visibilitycon from '@material-ui/icons/Visibility';

const GroupsIndex: React.FC = () => {
  return (
    <Paper>
      <Typography variant="h6">Skupiny</Typography>
      <List>
        <ListItem>
          <ListItemText primary="4.B" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="MVOP3" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="OSE1" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
};

export default GroupsIndex;
