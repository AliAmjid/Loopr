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
import Visibilitycon from '@material-ui/icons/Visibility';

const SubjectsIndex: React.FC = () => {
  return (
    <Paper>
      <Typography variant="h6">Předměty</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Matematika" secondary="4.B" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Český jazyk" secondary="4.B" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Webové apliakce" secondary="MVOP3" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Literatura v praxi" secondary="OSE1" />
          <ListItemSecondaryAction>
            <IconButton>
              <Visibilitycon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
};

export default SubjectsIndex;
