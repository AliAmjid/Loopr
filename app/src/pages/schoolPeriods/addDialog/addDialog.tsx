import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

import { AddDialogProps } from './types';

const AddDialog: React.FC<AddDialogProps> = props => {
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs().add(1, 'd'));
  const [quarter, setQuarter] = useState('1');
  const [year, setYear] = useState(`${dayjs().year()}`);

  return (
    <Dialog open={props.open}>
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        <Box>
          <KeyboardDatePicker
            label="from"
            format="DD. MM. YYYY"
            fullWidth
            value={from}
            onChange={from => {
              if (from) setFrom(from);
            }}
          />
        </Box>
        <Box pt={2}>
          <KeyboardDatePicker
            label="from"
            format="DD. MM. YYYY"
            fullWidth
            value={to}
            onChange={to => {
              if (to) setTo(to);
            }}
          />
        </Box>
        <Box pt={2}>
          <TextField
            label="quarter"
            type="number"
            fullWidth
            value={quarter}
            onChange={e => setQuarter(e.target.value)}
          />
        </Box>
        <Box pt={2}>
          <TextField
            label="schoolYear"
            type="number"
            fullWidth
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            props.onSubmit({
              from: from.toISOString(),
              to: to.toISOString(),
              quarter: +quarter,
              year: +year,
            })
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
