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
      <Tooltip title={t<string>('logOut')}>
        <IconButton color="inherit" onClick={() => setDialogOpen(true)}>
          <LogOutIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{t('logOutDialogTitle')}</DialogTitle>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={props.onLogOut}>
            {t('logOut')}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setDialogOpen(false)}
          >
            {t('back')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogOut;
