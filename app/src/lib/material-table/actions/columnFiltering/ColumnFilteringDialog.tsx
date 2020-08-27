import React, { useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@material-ui/core';

import useColumnFilteringState from 'lib/material-table/actions/columnFiltering/state';

import { ColumnFilteringDialogProps } from './types';

const ColumnFilteringDialog: React.FC<ColumnFilteringDialogProps> = props => {
  const { open, setOpen, selected, setSelected } = useColumnFilteringState();
  useEffect(() => {
    setSelected(props.defaultColumns || []);
  }, [props.defaultColumns]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Vyberte data, které chcete v tabulce zobrazovat</DialogTitle>
      <DialogContent>
        <InputLabel htmlFor="data-select">Data</InputLabel>
        <Select
          id="data-select"
          value={selected}
          onChange={e => setSelected(e.target.value as string[])}
          fullWidth
          multiple
        >
          <ListSubheader>Osobní informace</ListSubheader>
          {props.columns?.map(column => (
            <MenuItem
              key={column.field?.toString()}
              value={column.field?.toString()}
              selected={selected.some((s: string) => s === column.field)}
            >
              {column.title}
            </MenuItem>
          ))}
          <ListSubheader>Třída</ListSubheader>
        </Select>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnFilteringDialog;
