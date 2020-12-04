import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { AddDialogFormValues, AddDialogProps } from './types';

const AddDialog: React.FC<AddDialogProps> = props => {
  const { register, errors, handleSubmit } = useForm<AddDialogFormValues>();

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <DialogTitle>Add subject</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              label="name"
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={props.onClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default AddDialog;
