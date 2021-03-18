import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import LanguageSelect from 'components/LanguageSelect';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { PasswordResetRequestProps } from './types';

const PasswordResetRequest: React.FC<PasswordResetRequestProps> = props => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm<{ email: string }>();
  const { t } = useTranslation(namespaces.pages.login.passwordResetRequest);

  const submitHandler = ({ email }: { email: string }): void => {
    setLoading(true);
    props.onSubmit(email).then(() => {
      setLoading(false);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box pt={10}>
        <OverlayLoadingContainer>
          <OverlayLoading loading={loading} />
          <Paper>
            <Box p={2}>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" pt={2}>
                      <Typography variant="h4">{t('title')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <Typography align="center">{t('description')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      variant="outlined"
                      label={t('common:gqlObjects.user.email')}
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
                      {t('send')}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <LanguageSelect />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </OverlayLoadingContainer>
      </Box>
    </Container>
  );
};

export default PasswordResetRequest;
