import React, { LegacyRef } from 'react';

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider as SnackbarProviderPrefab } from 'notistack';

const notistackRef: LegacyRef<any> = React.createRef();
const onClickDismiss = (key: React.ReactText) => () => {
  notistackRef.current.closeSnackbar(key);
};

const SnackbarProvider = (props: any): JSX.Element => (
  <SnackbarProviderPrefab
    maxSnack={2}
    autoHideDuration={5000}
    {...props}
    ref={notistackRef}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    action={key => (
      <IconButton onClick={onClickDismiss(key)}>
        <CloseIcon />
      </IconButton>
    )}
  />
);

export default SnackbarProvider;
