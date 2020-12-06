import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import { SimpleDialogProps } from './types';

const SimpleDialog: React.FC<SimpleDialogProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.content && <DialogContent>{props.content}</DialogContent>}
      {props.actions && <DialogActions>{props.actions}</DialogActions>}
    </Dialog>
  );
};

export default SimpleDialog;
