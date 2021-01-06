import React from 'react';

import { Box, Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import { ColorChangeDialogProps } from './types';

const ColorChangeDialog: React.FC<ColorChangeDialogProps> = props => {
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'red',
    'blue',
    'green',
    'yellow',
    'red',
    'blue',
    'green',
    'yellow',
  ];

  const mappedColors = colors.map(color => (
    <Box
      key={color}
      style={{ backgroundColor: color }}
      width={50}
      height={50}
      mr={2}
      mb={2}
    />
  ));

  return (
    <Dialog open={props.open}>
      <DialogTitle>Change color</DialogTitle>
      <DialogContent>
        <Box display="flex" flexWrap="wrap">
          {mappedColors}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ColorChangeDialog;
