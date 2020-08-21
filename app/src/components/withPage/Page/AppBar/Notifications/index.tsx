import React, { useState } from 'react';

import NotificationsUI from 'components/withPage/Page/AppBar/Notifications/NotificationsUI';

const Notifications = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = () => {
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