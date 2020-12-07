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
              fullWidth
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={props.onClose}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default AddDialog;
