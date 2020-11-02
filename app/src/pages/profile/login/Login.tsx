import React from 'react';

import { Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { LoginProps, SubmitValues } from './types';

const Login: React.FC<LoginProps> = props => {
  const { register, handleSubmit } = useForm<SubmitValues>();

  const submitHandler = (values: SubmitValues): void => {
    props.onSubmit(values);
  };

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <Box pt={2}>
        <Typography variant="h6">Změna hesla</Typography>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Box pr={2} pt={2}>
              <TextField
                variant="outlined"
                label="Aktuální heslo"
                type="password"
                name="oldPassword"
                inputRef={register({ required: true })}
              />
            </Box>
            <Box pr={2} pt={2}>
              <TextField
                variant="outlined"
                label="Nové heslo"
                type="password"
                error={props.notMatch}
                name="newPassword1"
                inputRef={register({ required: true })}
              />
            </Box>
            <Box pr={2} pt={2}>
              <TextField
                variant="outlined"
                label="Nové heslo znovu"
                type="password"
                error={props.notMatch}
                name="newPassword2"
                inputRef={register({ required: true })}
              />
            </Box>
          </Box>
          <Box pt={2} pb={2} display="flex" justifyContent="flex-end">
            <Button color="primary" variant="contained" type="sbumit">
              Změnit
            </Button>
          </Box>
        </form>
        <Divider />
      </Box>
    </OverlayLoadingContainer>
  );
};

export default Login;
