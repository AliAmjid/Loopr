import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { SimpleDialogProps } from './types';

const SimpleDialog: React.FC<SimpleDialogProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <OverlayLoadingContainer>
        <form>
          <OverlayLoading loading={props.loading || false} />
          {props.title && <DialogTitle>{props.title}</DialogTitle>}
          {props.content && <DialogContent>{props.content}</DialogContent>}
          {props.actions && <DialogActions>{props.actions}</DialogActions>}
        </form>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default SimpleDialog;
