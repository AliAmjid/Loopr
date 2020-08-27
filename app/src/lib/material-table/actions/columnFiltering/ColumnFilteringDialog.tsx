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
import { useTranslation } from 'react-i18next';

import namespaces from 'lib/i18n/namespaces';
import useColumnFilteringState from 'lib/material-table/actions/columnFiltering/state';

import { ColumnFilteringDialogProps } from './types';

const ColumnFilteringDialog: React.FC<ColumnFilteringDialogProps> = props => {
  const { open, setOpen, selected, setSelected } = useColumnFilteringState(
    state => ({
      open: state.open,
      setOpen: state.setOpen,
      selected: state.selected,
      setSelected: state.setSelected,
    }),
  );
  const { t } = useTranslation(namespaces.lib.materialTable);
  useEffect(() => {
    setSelected(props.defaultColumns);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {t('defaultActions.columnFiltering.dialogTitle')}
      </DialogTitle>
      <DialogContent>
        <InputLabel htmlFor="data-select">Data</InputLabel>
        <Select
          id="data-select"
          value={selected}
          onChange={e => setSelected(e.target.value as string[])}
          fullWidth
          multiple
        >
          {props.columns?.map(column => {
            if ('section' in column)
              return (
                <ListSubheader key={column.section}>
                  {column.section}
                </ListSubheader>
              );
            if ('field' in column)
              return (
                <MenuItem
                  key={column.field?.toString()}
                  value={column.field?.toString()}
                  selected={selected.some((s: string) => s === column.field)}
                >
                  {column.title}
                </MenuItem>
              );

            return undefined;
          })}
        </Select>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnFilteringDialog;
