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
          secondary={props.user?.firstname || ''}
          edit="secondary"
          onSubmit={firstname => props.onChange({ firstname })}
        />
        <EditableListItem
          primary="Jméno"
          secondary={props.user?.lastname || ''}
          edit="secondary"
          onSubmit={lastName => props.onChange({ lastName })}
        />
        <EditableListItem
          primary="Email"
          secondary={props.user?.email || ''}
          edit="secondary"
          onSubmit={username => props.onChange({ email: username })}
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
