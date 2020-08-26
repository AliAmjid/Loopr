import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { LogOutProps } from './types';

const LogOut = (props: LogOutProps): JSX.Element => {
  const { t } = useTranslation(namespaces.components.withPage);

  return (
    <Tooltip title={t<string>('appBar.logOut')}>
      <IconButton color="inherit" onClick={props.onLogOut}>
        <LogOutIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogOut;
