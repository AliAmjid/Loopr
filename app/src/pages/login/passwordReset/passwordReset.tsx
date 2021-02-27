import React from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import LanguageSelect from 'components/LanguageSelect';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { PasswordResetProps } from './types';

const PasswordReset: React.FC<PasswordResetProps> = props => {
  const { handleSubmit, register } = useForm<{
    password1: string;
    password2: string;
  }>();
  const { t } = useTranslation(namespaces.pages.login.passwordReset);
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = ({
    password1,
    password2,
  }: {
    password1: string;
    password2: string;
  }): void => {
    if (password1 !== password2) {
      enqueueSnackbar(t('notMatch'), { variant: 'warning' });

      return;
    }
    props.onSubmit(password1);
  };

  return (
    <Container maxWidth="xs">
      <Box pt={10}>
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading} />
          <Paper>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h1">{t('title')}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password1"
                    type="password"
                    variant="outlined"
                    label={t('newPassword')}
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password2"
                    type="password"
                    variant="outlined"
                    label={t('newPasswordAgain')}
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    {t('common:actions.submit')}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <LanguageSelect />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </OverlayLoadingContainer>
      </Box>
    </Container>
  );
};

export default PasswordReset;
