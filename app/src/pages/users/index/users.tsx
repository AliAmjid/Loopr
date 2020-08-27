import React, { useState } from 'react';

import {
  Box,
  Button,
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
        columns={[]}
        data={[
          { name: 'Igor Hnízdo', class: '3B', email: 'ahoj@ahoj.cz' },
          { name: 'Pavel Laško', class: '3B', email: 'ahoj@ahoj.cz' },
          { name: 'Lucie Černá', class: '4B', email: 'ahoj@ahoj.cz' },
        ]}
        options={{ exportButton: true }}
        defaultActions={{
          columnFiltering: {
            active: true,
            defaultColumns: ['name'],
            columns: [
              { section: 'Osobní údaje' },
              { title: 'Jméno', field: 'name' },
              { title: 'Email', field: 'email' },
              { section: 'Zařazení' },
              { title: 'Třída', field: 'class' },
            ],
          },
          grouping: { active: true },
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button color="primary" variant="contained">
          Přidat uživatele
        </Button>
      </Box>
    </Paper>
  );
};

export default Users;
