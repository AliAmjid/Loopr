import React from 'react';

import {
  Divider,
  IconButton,
  ListItem as ListItemPrefab,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import { ListItemProps } from './types';

const ListItem = (props: ListItemProps) => {
  return (
    <>
      <ListItemPrefab button>
        <ListItemAvatar>
          <IconButton color="primary">{props.icon}</IconButton>
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
