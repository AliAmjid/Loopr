import React from 'react';

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    boxShadow: '5px 0px 4px -1px rgba(0,0,0,0.2)',
    padding: theme.spacing(2),
  },
}));

const SideTable: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6">Třídy</Typography>
      <TextField label="Find" fullWidth />
      <List>
        <ListItem>
          <ListItemText primary="A" secondary="Mgr. Olga Kaiferová" />
          <ListItemSecondaryAction>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="A" secondary="Mgr. Olga Kaiferová" />
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        <ListItem>
          <ListItemText primary="A" secondary="Mgr. Olga Kaiferová" />
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
};

export default SideTable;
