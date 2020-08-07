import React from 'react';

import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'lib/i18n';
import Link from 'lib/next/Link';

import { FormValues, LoginProps } from 'pages/login/types';

import Help from 'components/Help';
import LanguageSelect from 'components/LanguageSelect';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(20),
  },
  form: {
    width: '100%',
  },
}));

const Login = (props: LoginProps): JSX.Element => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<FormValues>();
  const { t } = useTranslation('login');

  const submitHandler = (values: FormValues): void => {
    props.onSubmit(values.email, values.password);
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1">
                {t('title')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label={t('email')}
                fullWidth
                inputRef={register({ required: true })}
                inputProps={{ 'test-id': 'emailInput' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label={t('password')}
                fullWidth
                inputRef={register({ required: true })}
                inputProps={{ 'test-id': 'passwordInput' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                test-id="submitButton"
                tour-id="submitButton"
              >
                {t('logIn')}
              </Button>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <Link href="/index">{t('forgottenPassword')}</Link>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <Link href="/index">{t('doNotHaveAccount')}</Link>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Help path="login" size="small" />
            </Grid>
            <Grid item container xs={6} justify="flex-end">
              <LanguageSelect size="small" />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
