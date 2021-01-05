import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

import { ExamInfoDialogProps } from './types';

const ExamInfoDialog: React.FC<ExamInfoDialogProps> = props => {
  const [name, setName] = useState('');
  const [maxPoints, setMaxPoints] = useState('');

  useEffect(() => {
    setName(props.defaultValues.name);
    setMaxPoints(`${props.defaultValues.maxPoints}`);
  }, [props.defaultValues]);

  return (
    <Dialog open={props.open}>
      <form>
        <DialogTitle>Exam</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Box pt={2}>
            <TextField
              label="Max points"
              fullWidth
              type="number"
              value={maxPoints}
              error={+maxPoints < 0}
              onChange={e => setMaxPoints(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            close
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={e => {
              e.preventDefault();
              props.onSubmit({ name, maxPoints });
            }}
            disabled={+maxPoints < 0}
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExamInfoDialog;
