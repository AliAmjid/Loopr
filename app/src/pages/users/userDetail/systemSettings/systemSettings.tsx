import React from 'react';

import { ListItemText } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';

import { formatDateToMinute } from 'components/formatDate';
import HorizontalList from 'components/HorizontalList';
import SwitchableListItem from 'components/SwitchableListItem';

import { SystemSettingsProps } from './types';

const SystemSettings: React.FC<SystemSettingsProps> = props => {
  const { t } = useTranslation();

  return (
    <>
      <HorizontalList>
        <ListItemText
          primary={t('gqlObjects.user.createdAt')}
          secondary={formatDateToMinute(props.user?.createdAt || '')}
        />
        <ListItemText
          primary={t('gqlObjects.user.classGroup')}
          secondary={`${props.user?.classGroup?.year || '-'} ${
            props.user?.classGroup?.section || ''
          }`}
        />
        <SwitchableListItem
          primary={t('gqlObjects.user.archived')}
          checked={Boolean(props.user?.archivedAt)}
          onChange={props.onArchive}
        />
        <></>
      </HorizontalList>
    </>
  );
};

export default SystemSettings;
