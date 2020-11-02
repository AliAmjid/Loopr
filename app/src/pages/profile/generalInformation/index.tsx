import React from 'react';

import { ListItemText } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import HorizontalList from 'components/HorizontalList';
import stripRolePrefix from 'components/stripRolePrefix';

import { GeneralInformationsProps } from './types';

const GeneralInformation: React.FC<GeneralInformationsProps> = props => {
  const { t } = useTranslation(namespaces.pages.profile.index);

  return (
    <>
      <HorizontalList>
        <ListItemText
          primary={t('firstname')}
          secondary={props.user?.firstname || ''}
        />
        <ListItemText
          primary={t('lastname')}
          secondary={props.user?.lastname || ''}
        />
        <ListItemText
          primary={t('email')}
          secondary={props.user?.email || ''}
        />
        <ListItemText
          primary={t('role')}
          secondary={stripRolePrefix(props.user?.role.name || '')}
        />
      </HorizontalList>
    </>
  );
};

export default GeneralInformation;
