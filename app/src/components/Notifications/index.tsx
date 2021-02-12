import React from 'react';

import { List, makeStyles } from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import Notification from './Notification';
import { NotificationsIndexProps } from './types';

const listWidth = 300;

const useStyles = makeStyles({
  list: {
    width: listWidth,
    maxHeight: 400,
  },
});

const Notifications: React.FC<NotificationsIndexProps> = props => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
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
      {props.bottomElement ? props.bottomElement : <></>}
    </List>
  );
};

export default Notifications;
