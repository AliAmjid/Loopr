import React from 'react';

import {
  Divider,
  fade,
  IconButton,
  ListItem as ListItemPrefab,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';

import { ListItemProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  selectedItem: {
    backgroundColor: `${fade(theme.palette.secondary.light, 0.5)} !important`,
  },
  selectedItemColor: {
    color: theme.palette.common.black,
  },
}));

const ListItem: React.FC<ListItemProps> = props => {
  const classes = useStyles();

  return (
    <>
      <ListItemPrefab
        ref={props.innerRef}
        className={props.viewAt ? '' : classes.selectedItem}
        button
        selected={!props.viewAt}
        onClick={props.onClick}
      >
        <ListItemAvatar>
          <IconButton
            color="primary"
            className={props.viewAt ? '' : classes.selectedItemColor}
          >
            {props.icon}
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={props.primaryText}
          secondary={props.secondaryText}
        />
      </ListItemPrefab>
      <Divider />
    </>
  );
};

export default ListItem;
