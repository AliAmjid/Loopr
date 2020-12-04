import React, { useEffect } from 'react';

import {
  Box,
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
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <Box pb={2}>
              <TextField
                name="year"
                label="class year"
                type="number"
                fullWidth
                inputRef={register({ required: true })}
                error={errors.year !== undefined}
                defaultValue={props.defaultValues?.year || ''}
              />
            </Box>

            <TextField
              name="name"
              label="class name"
              fullWidth
              inputRef={register({ required: true })}
              error={errors.name !== undefined}
              defaultValue={props.defaultValues?.section || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              {props.primaryButtonLabel}
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

export default ClassGroupDialog;
