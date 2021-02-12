import React, { useState } from 'react';

import Notifications from './notifications';
import { NotificationsIndexProps } from './types';

const NotificationsIndex: React.FC<NotificationsIndexProps> = props => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = (): void => {
    setAnchorEl(null);
  };

  return (
    <Notifications
      anchorEl={anchorEl}
      onClick={clickHandler}
      onClose={closeHandler}
      notifications={props.user?.notifications || []}
      onFetchMore={props.onFetchMore}
    />
  );
};

export default NotificationsIndex;
