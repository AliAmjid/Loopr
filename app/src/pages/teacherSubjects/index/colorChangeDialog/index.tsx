import React from 'react';

import ColorChangeDialog from './colorChangeDialog';
import { ColorChangeDialogIndexProps } from './types';

const ColorChangeDialogIndex: React.FC<ColorChangeDialogIndexProps> = props => {
  return (
    <ColorChangeDialog
      open={props.open}
      onCancel={props.onClose}
      onSubmit={props.onClose}
    />
  );
};

export default ColorChangeDialogIndex;
