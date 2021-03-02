import React from 'react';

import {
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core';

import { SwitchableListItemProps } from './types';

const SwitchableListItem: React.FC<SwitchableListItemProps> = props => {
  return (
    <>
      <ListItemText primary={props.primary} secondary={props.secondary} />
      <ListItemSecondaryAction>
        <Switch
          checked={props.checked}
          onChange={e => props.onChange(e.target.checked)}
        />
      </ListItemSecondaryAction>
    </>
  );
};

export default SwitchableListItem;
