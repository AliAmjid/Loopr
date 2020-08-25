import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

import { useTranslation } from 'lib/i18n';

import { LogOutProps } from './types';

const LogOut = (props: LogOutProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t<string>('appBar.logOut')}>
      <IconButton color="inherit" onClick={props.onLogOut}>
        <LogOutIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogOut;
