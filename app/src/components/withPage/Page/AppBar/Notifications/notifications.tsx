import React from 'react';

import {
  Badge,
  IconButton,
  List,
  makeStyles,
  Popover,
  Tooltip,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import NotificationsComponent from 'components/Notifications';

import { NotificationsProps } from './types';

const listWidth = 300;

const Notifications: React.FC<NotificationsProps> = props => {
  const { t } = useTranslation(namespaces.components.withPage);

  return (
    <>
      <Tooltip title={t<string>('notifications')}>
        <IconButton color="inherit" onClick={props.onClick}>
          <Badge badgeContent={3} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationsComponent
          notifications={props.notifications}
          onFetchMore={props.onFetchMore}
        />
      </Popover>
    </>
  );
};

export default Notifications;
