import React, { useState } from 'react';

import NotificationsUI from './NotificationsUI';
import { NotificationsIndexProps } from './types';

const Notifications: React.FC<NotificationsIndexProps> = props => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = (): void => {
    setAnchorEl(null);
  };

  return (
    <NotificationsUI
      anchorEl={anchorEl}
      onClick={clickHandler}
      onClose={closeHandler}
      notifications={props.user?.notifications || []}
      onFetchMore={props.onFetchMore}
    />
  );
};

export default Notifications;
