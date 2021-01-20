import React from 'react';

import {
  Badge,
  fade,
  IconButton,
  List,
  makeStyles,
  Popover,
  Theme,
  Tooltip,
} from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import ListItem from './ListItem';
import { NotificationsUIProps } from './types';

const listWidth = 300;

const useStyles = makeStyles({
  list: {
    width: listWidth,
    maxHeight: 400,
  },
});

const NotificationsUI: React.FC<NotificationsUIProps> = props => {
  const classes = useStyles();
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
        <List className={classes.list}>
          {props.notifications.map(notification => {
            let primary = '';
            let secondary = '';

            switch (notification.type) {
              case 'POINT_CHANGED':
                primary = 'pointsChanged';
                secondary = notification.parameters.examName;
                break;
              default:
                break;
            }

            return (
              <ListItem
                key={notification.id}
                icon={<GradeIcon />}
                primaryText={primary}
                secondaryText={secondary}
              />
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default NotificationsUI;
