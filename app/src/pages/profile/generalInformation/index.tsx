import React from 'react';

import { ListItemText } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';

import HorizontalList from 'components/HorizontalList';
import stripRolePrefix from 'components/stripRolePrefix';

import { GeneralInformationsProps } from './types';

const GeneralInformation: React.FC<GeneralInformationsProps> = props => {
  const { t } = useTranslation('common');

  return (
    <>
      <HorizontalList>
        <ListItemText
          primary={t('gqlObjects.user.firstname')}
          secondary={props.user?.firstname || ''}
        />
        <ListItemText
          primary={t('gqlObjects.user.lastname')}
          secondary={props.user?.lastname || ''}
        />
        <ListItemText
          primary={t('gqlObjects.user.email')}
          secondary={props.user?.email || ''}
        />
        <ListItemText
          primary={t('gqlObjects.user.role')}
          secondary={stripRolePrefix(props.user?.role.name || '')}
        />
      </HorizontalList>
    </>
  );
};

export default GeneralInformation;
