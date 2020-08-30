import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { LogOutProps } from './types';

const LogOut: React.FC<LogOutProps> = props => {
  const { t } = useTranslation(namespaces.components.withPage);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip title={t<string>('appBar.logOut')}>
        <IconButton color="inherit" onClick={() => setDialogOpen(true)}>
          <LogOutIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Opravdu se chcete odhlásit?</DialogTitle>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={props.onLogOut}
          >
            Odhlásit se
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setDialogOpen(false)}
          >
            Zpět
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogOut;
