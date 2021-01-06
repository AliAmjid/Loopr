import React from 'react';

import { Box } from '@material-ui/core';

const OverlayLoadingContainer: React.FC = ({ children }) => (
  <Box position="relative" height="100%">
    {children}
  </Box>
);

export default OverlayLoadingContainer;
