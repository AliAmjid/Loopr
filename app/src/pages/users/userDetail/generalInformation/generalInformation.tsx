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
          primary="name"
          secondary={props.user?.firstname || ''}
          edit="secondary"
          onSubmit={firstname => props.onChange({ firstname })}
        />
        <EditableListItem
          primary="surname"
          secondary={props.user?.lastname || ''}
          edit="secondary"
          onSubmit={lastname => props.onChange({ lastname })}
        />
        <EditableListItem
          primary="email"
          secondary={props.user?.email || ''}
          edit="secondary"
          onSubmit={username => props.onChange({ email: username })}
        />
        <EditableListItem
          primary="role"
          secondary={props.user?.role.id || ''}
          edit="secondary"
          onSubmit={role => props.onChange({ role })}
          lookup={props.rolesLookup}
        />
        <>
          <ListItemText
            primary="registered in"
            secondary={formatDateToMinute(props.user?.createdAt || '')}
          />
        </>
      </HorizontalList>
    </>
  );
};

export default GeneralInformation;
