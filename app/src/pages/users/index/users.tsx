import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';

import MaterialTable from 'lib/material-table';

const Users: React.FC = () => {
  const [open, setOpen] = useState(false);

  const columns = [
    { title: 'Jméno', field: 'name' },
    { title: 'Třída', field: 'class' },
    { title: 'Email', field: 'email' },
  ];

  return (
    <Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Vyberte data, které chcete v tabulce zobrazovat
        </DialogTitle>
        <DialogContent>
          <InputLabel htmlFor="data-select">Data</InputLabel>
          <Select id="data-select" value={[1, 2]} fullWidth multiple>
            <MenuItem value={1}>AHOj</MenuItem>
            <MenuItem value={2}>AHOj</MenuItem>
          </Select>
        </DialogContent>
      </Dialog>
      <MaterialTable
        title="Seznam uživatelů"
        columns={columns}
        data={[{ name: 'AHOJ', class: '3B', email: 'ahoj@ahoj.cz' }]}
        options={{ exportButton: true }}
        defaultActions={{
          columnFiltering: { active: true, columns, defaultColumns: ['name'] },
        }}
      />
    </Paper>
  );
};

export default Users;
