import React, { useEffect } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { ClassGroupDialogFormValues, ClassGroupDialogProps } from './types';

const ClassGroupDialog: React.FC<ClassGroupDialogProps> = props => {
  const { handleSubmit, register, errors, setValue } = useForm<
    ClassGroupDialogFormValues
  >();

  const submitHandler = (values: ClassGroupDialogFormValues): void => {
    props.onSubmit({ section: values.name, year: +values.year });
  };

  return (
    <Dialog open={props.open}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <DialogTitle>Class add</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="year"
                  label="class year"
                  type="number"
                  fullWidth
                  inputRef={register({ required: true })}
                  error={errors.year !== undefined}
                  defaultValue={props.defaultValues?.year || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="class name"
                  fullWidth
                  inputRef={register({ required: true })}
                  error={errors.name !== undefined}
                  defaultValue={props.defaultValues?.section || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="contained"
                >
                  {props.primaryButtonLabel}
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

export default ClassGroupDialog;
