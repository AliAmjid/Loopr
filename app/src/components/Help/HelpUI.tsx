import React from 'react';

import { IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { HelpUIProps } from 'components/Help/types';

const HelpUI = (props: HelpUIProps): JSX.Element => {
  return (
    <IconButton {...props}>
      <HelpIcon />
    </IconButton>
  );
};

export default HelpUI;
