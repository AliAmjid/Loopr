import React from 'react';

import {
  Badge,
  Button,
  Divider,
  IconButton,
  List,
  ListItem as ListItemPrefab,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from '@material-ui/core';
import ChatBubble from '@material-ui/icons/ChatBubble';
import GradeIcon from '@material-ui/icons/Grade';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItem from './ListItem';
import { NotificationsUIProps } from './types';

const listWidth = 300;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: listWidth,
  },
}));

const NotificationsUI = (props: NotificationsUIProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <IconButton color="inherit" onClick={props.onClick}>
        <Badge badgeContent={3} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
      >
        <List
          className={classes.list}
          subheader={<ListSubheader>Upozornění</ListSubheader>}
        >
          <ListItem
            icon={<GradeIcon />}
            primaryText="Nová známka"
            secondaryText="Matematika"
          />
          <ListItem
            icon={<ChatBubble />}
            primaryText="Nová zpráva"
            secondaryText="Radko Sáblík"
          />
          <ListItemPrefab>
            <Button fullWidth>Odstranit vše</Button>
          </ListItemPrefab>
        </List>
      </Popover>
    </>
  );
};

export default NotificationsUI;
