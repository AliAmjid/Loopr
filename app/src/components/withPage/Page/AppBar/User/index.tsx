import React, { useState } from 'react';

import UserUI from './UserUI';

const User = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clickHandler = (button: HTMLButtonElement) => {
    setAnchorEl(button);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <UserUI anchorEl={anchorEl} onClick={clickHandler} onClose={closeHandler} />
  );
};

export default User;
