import React from 'react';

import { Box } from '@material-ui/core';

const SideDialogContainer: React.FC = props => {
  return (
    <Box position="relative" height="100%" width="100%" overflow="hidden">
      {props.children}
    </Box>
  );
};

export default SideDialogContainer;
