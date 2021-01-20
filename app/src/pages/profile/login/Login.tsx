import React from 'react';

import { Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ThickDivider from 'components/thickDivider';

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
        <Typography variant="h3">Změna hesla</Typography>
        <ThickDivider />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Box pr={2} pt={2}>
              <TextField
                variant="outlined"
                label="currentPassword"
                type="password"
                name="oldPassword"
                inputRef={register({ required: true })}
              />
            </Box>
            <Box pr={2} pt={2}>
              <TextField
                variant="outlined"
                label="newPassword"
                type="password"
                error={props.notMatch}
                name="newPassword1"
                inputRef={register({ required: true })}
              />
            </Box>
            <Box pr={2} pt={2}>
              <TextField
                variant="outlined"
                label="newPasswordAgain"
                type="password"
                error={props.notMatch}
                name="newPassword2"
                inputRef={register({ required: true })}
              />
            </Box>
          </Box>
          <Box pt={2} pb={2} display="flex" justifyContent="flex-end">
            <Button color="primary" variant="contained" type="submit">
              Change
            </Button>
          </Box>
        </form>
        <Divider />
      </Box>
    </OverlayLoadingContainer>
  );
};

export default Login;
