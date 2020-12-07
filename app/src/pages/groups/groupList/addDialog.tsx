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

import {
  AddDialogFormValues,
  AddDialogProps,
} from 'pages/groups/groupList/types';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

const AddDialog: React.FC<AddDialogProps> = props => {
  const { handleSubmit, register, errors } = useForm<AddDialogFormValues>();

  const submitHandler = (values: AddDialogFormValues): void => {
    props.onSubmit({ section: values.name });
  };

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />

        <DialogTitle>Group add</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <TextField
              name="name"
              label="group name"
              fullWidth
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
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
