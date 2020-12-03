import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
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
        <DialogContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="group name"
                  fullWidth
                  inputRef={register({ required: true })}
                  error={errors.name !== undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  onClick={props.onClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </OverlayLoadingContainer>
    </Dialog>
  );
};

export default AddDialog;
