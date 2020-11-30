import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';

import { AddDialogProps } from './types';

const AddDialog: React.FC<AddDialogProps> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Group add</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="group year" type="number" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="group name" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                onClick={e => {
                  e.preventDefault();
                  props.onSubmit({});
                }}
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
    </Dialog>
  );
};

export default AddDialog;
