import React from 'react';

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import EditableListItem from 'components/EditableListItem';
import { formatDateToMinute } from 'components/formatDate';
import HorizontalList from 'components/HorizontalList';
import stripRolePrefix from 'components/stripRolePrefix';

import { GeneralInformationProps } from './types';

const GeneralInformation: React.FC<GeneralInformationProps> = props => {
  return (
    <>
      <HorizontalList>
        <EditableListItem
          primary="Jméno"
          secondary={props.user?.name}
          edit="secondary"
          onSubmit={name => props.onChange({ name })}
        />
        <>
          <ListItemText
            primary="Příjmení"
            secondary="ALI TO JEŠTĚ NEDODĚLAL!!!"
          />
        </>
        <EditableListItem
          primary="Email"
          secondary={props.user?.username}
          edit="secondary"
          onSubmit={username => props.onChange({ username })}
        />
        <>
          <ListItemText
            primary="Role"
            secondary={stripRolePrefix(props.user?.role.name || '')}
          />
        </>
        <>
          <ListItemText
            primary="Registrován v"
            secondary={formatDateToMinute(props.user?.createdAt || '')}
          />
        </>
      </HorizontalList>
    </>
  );
};

export default GeneralInformation;
