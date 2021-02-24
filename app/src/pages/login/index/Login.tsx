import React from 'react';

import {
  Box,
  Button,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

import helpPaths from 'config/helpPaths';
import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { FormValues, LoginProps } from 'pages/login/index/types';

import Help from 'components/Help';
import LanguageSelect from 'components/LanguageSelect';
import Link from 'components/Link';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import AstronautIllustration from './images/astronaut.svg';
import LaptopIllustration from './images/laptop.svg';
import Logo from './images/logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    maxWidth: theme.spacing(50),
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(20),
    },
  },
  form: {
    width: '100%',
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

const Login: React.FC<LoginProps> = props => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<FormValues>();
  const { t } = useTranslation(namespaces.pages.login);

  const submitHandler = (values: FormValues): void => {
    props.onSubmit(values.email, values.password);
  };

  return (
    <Box display="flex" justifyContent="flex-end" className={classes.root}>
      <Hidden mdDown>
        <Box position="absolute" top={0} left={0} p={10}>
          <Box width={350} height={100}>
            <Logo width="100%" height="100%" />
          </Box>
          <Typography variant="h1">Jednoduchý školní online systém</Typography>
        </Box>
      </Hidden>
      <Box display="flex" flexDirection="column" pt={20}>
        <Paper className={classes.paper}>
          <OverlayLoadingContainer>
            <OverlayLoading loading={props.loading} />
            <form onSubmit={handleSubmit(submitHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box pb={2}>
                    <Typography variant="h4" component="h1" color="primary">
                      {t('title')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label={t('email')}
                    variant="outlined"
                    fullWidth
                    autoComplete="email"
                    autoFocus
                    inputRef={register({ required: true })}
                    inputProps={{ 'test-id': 'Login-emailInput' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    type="password"
                    label={t('password')}
                    variant="outlined"
                    fullWidth
                    autoComplete="current-password"
                    inputRef={register({ required: true })}
                    inputProps={{ 'test-id': 'Login-passwordInput' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    test-id="Login-submitButton"
                    tour-id="Login-submitButton"
                  >
                    {t('logIn')}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href={routes.login.passwordResetRequest}>
                    {t('forgottenPassword')}
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Help path={helpPaths.login} size="small" />
                </Grid>
                <Grid item container xs={6} justify="flex-end">
                  <LanguageSelect size="small" />
                </Grid>
              </Grid>
            </form>
          </OverlayLoadingContainer>
        </Paper>
        <Hidden xsDown>
          <Box height={300} width={300} ml={30} mt={-5} zIndex={-1}>
            <AstronautIllustration height="100%" width="100%" />
          </Box>
        </Hidden>
      </Box>
      <Hidden smDown>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          height={270}
          width={500}
          pb={2}
        >
          <LaptopIllustration height="100%" width="100%" />
        </Box>
      </Hidden>
    </Box>
  );
};

export default Login;
