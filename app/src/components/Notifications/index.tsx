import React from 'react';

import { List, makeStyles, Theme } from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import Notification from './Notification';
import { NotificationsIndexProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  bottom: {
    backgroundColor: theme.palette.common.white,
    position: 'sticky',
    bottom: 0,
  },
}));

const Notifications: React.FC<NotificationsIndexProps> = props => {
  const classes = useStyles();

  return (
    <div style={props.listStyle}>
      <List>
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading || false} />

          {props.notifications.map((notification, index) => (
            <Notification
              key={notification.id}
              notification={notification}
              onFetchMore={
                index !== props.notifications.length - 1
                  ? undefined
                  : props.onFetchMore
              }
              onRedirect={props.onRedirect}
            />
          ))}
        </OverlayLoadingContainer>
      </List>
      <div className={classes.bottom}>
        {props.bottomElement ? props.bottomElement : <></>}
      </div>
    </div>
  );
};

export default Notifications;
