import React from 'react';

import {
  Divider,
  IconButton,
  ListItem as ListItemPrefab,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import { ListItemProps } from './types';

const ListItem: React.FC<ListItemProps> = props => {
  return (
    <>
      <ListItemPrefab ref={props.innerRef} button>
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
