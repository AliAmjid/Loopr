import React, { useState } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { compose } from 'recompose';

import config from 'config';
import routes from 'config/routes';

import withApollo from 'lib/apollo/withApollo';
import namespaces from 'lib/i18n/namespaces';
import withNamespaces from 'lib/i18n/withNamespaces';
import withTour from 'lib/reactour/withTour';

import getTokenQuery, {
  GetTokenQuery,
  GetTokenQueryVars,
} from './getToken.query';
import Login from './login';
import meUserQuery, { MeUserQuery } from './meUser.query';
import loginTour from './tour';

const LoginIndex = (): JSX.Element => {
  const [
    getToken,
    { data: getTokenData, error: getTokenError, loading: getTokenLoading },
  ] = useLazyQuery<GetTokenQuery, GetTokenQueryVars>(getTokenQuery, {
    fetchPolicy: 'no-cache',
  });
  const { data: meUserData } = useQuery<MeUserQuery>(meUserQuery, {
    fetchPolicy: 'no-cache',
  });
  const [automaticallyLogged, setAutomaticallyLogged] = useState(false);
  const router = useRouter();

  const submitHandler = (email: string, password: string): void => {
    getToken({ variables: { username: email, password } });
  };

  const { enqueueSnackbar } = useSnackbar();

  if (meUserData) {
    if (!automaticallyLogged) {
      setAutomaticallyLogged(true);
      router.push(routes.dashboard.index);
      enqueueSnackbar('Byli jste automaticky přihlášeni', {
        variant: 'success',
      });
    }
  }

  if (!getTokenLoading) {
    if (getTokenError) {
      enqueueSnackbar('Zadané údaje se neshodují', {
        variant: 'error',
      });
    }
    if (getTokenData) {
      cookie.set(config.tokenCookie, getTokenData.getToken.token);
      router.push(routes.dashboard.index);
    }
  }

  return (
    <>
      <Login onSubmit={submitHandler} />
    </>
  );
};
export default compose(
  withNamespaces([namespaces.pages.login]),
  withApollo,
  withTour(loginTour),
)(LoginIndex);
