import React, { useState } from 'react';

import NotificationsUI from 'components/withPage/Page/AppBar/Notifications/NotificationsUI';

const Notifications: React.FC = () => {
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
    />
  );
};

export default Notifications;
