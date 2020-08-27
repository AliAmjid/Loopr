import React, { useState } from 'react';

import UserUI from './UserUI';

const User: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const clickHandler = (button: HTMLButtonElement): void => {
    setAnchorEl(button);
  };

  const closeHandler = (): void => {
    setAnchorEl(null);
  };

  return (
    <UserUI anchorEl={anchorEl} onClick={clickHandler} onClose={closeHandler} />
  );
};

export default User;
