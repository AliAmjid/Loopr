import React from 'react';

import { ListItemText } from '@material-ui/core';

import EditableListItem from 'components/EditableListItem';
import { formatDateToMinute } from 'components/formatDate';
import HorizontalList from 'components/HorizontalList';

import { GeneralInformationProps } from './types';

const GeneralInformation: React.FC<GeneralInformationProps> = props => {
  return (
    <>
      <HorizontalList>
        <EditableListItem
          primary="Jméno"
          secondary={props.user?.name || ''}
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
          secondary={props.user?.username || ''}
          edit="secondary"
          onSubmit={username => props.onChange({ username })}
        />
        <EditableListItem
          primary="Role"
          secondary={props.user?.role.id || ''}
          edit="secondary"
          onSubmit={role => props.onChange({ role })}
          lookup={props.rolesLookup}
        />
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
