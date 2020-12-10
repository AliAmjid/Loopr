import React from 'react';

import { ListItemText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import EditableListItem from 'components/EditableListItem';
import { formatDateToMinute } from 'components/formatDate';
import HorizontalList from 'components/HorizontalList';

import { GeneralInformationProps } from './types';

const GeneralInformation: React.FC<GeneralInformationProps> = props => {
  const { t } = useTranslation();

  return (
    <>
      <HorizontalList>
        <EditableListItem
          primary={t('gqlObjects.user.firstname')}
          secondary={props.user?.firstname || ''}
          edit="secondary"
          onSubmit={firstname => props.onChange({ firstname })}
        />
        <EditableListItem
          primary={t('gqlObjects.user.lastname')}
          secondary={props.user?.lastname || ''}
          edit="secondary"
          onSubmit={lastname => props.onChange({ lastname })}
        />
        <EditableListItem
          primary={t('gqlObjects.user.email')}
          secondary={props.user?.email || ''}
          edit="secondary"
          onSubmit={username => props.onChange({ email: username })}
        />
        <EditableListItem
          primary={t('gqlObjects.user.role')}
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
