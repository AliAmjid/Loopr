import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@material-ui/core';

import { ColumnFilteringDialogProps } from './types';

const ColumnFilteringDialog = (
  props: ColumnFilteringDialogProps,
): JSX.Element => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Vyberte data, které chcete v tabulce zobrazovat</DialogTitle>
    <DialogContent>
      <InputLabel htmlFor="data-select">Data</InputLabel>
      <Select
        id="data-select"
        value={props.selected}
        onChange={props.onChange}
        fullWidth
        multiple
      >
        <ListSubheader>Osobní informace</ListSubheader>
        {props.columns?.map(column => (
          <MenuItem
            key={column.field?.toString()}
            value={column.field?.toString()}
            selected={props.selected?.some(s => s === column.field)}
          >
            {column.title}
          </MenuItem>
        ))}
        <ListSubheader>Třída</ListSubheader>
      </Select>
    </DialogContent>
  </Dialog>
);

export default ColumnFilteringDialog;
