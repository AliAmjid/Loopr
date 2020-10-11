import React, { useEffect, useState } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { compose } from 'recompose';

import config from 'config';
import routes from 'config/routes';

import recognizeError from 'lib/apollo/recognizeError';
import errors from 'lib/apollo/recognizeError/errors';
import withApollo from 'lib/apollo/withApollo';
import namespaces from 'lib/i18n/namespaces';
import withNamespaces from 'lib/i18n/withNamespaces';
import useTour from 'lib/reactour';

import loginNamespaces from 'pages/login/namespaces';

import {
  LoginGetTokenQuery,
  LoginGetTokenQueryVariables,
  LoginMeUserQuery,
} from 'types/graphql';

import LOGIN_GET_TOKEN_QUERY from './queries/getToken';
import LOGIN_ME_USER_QUERY from './queries/meUser';
import Login from './Login';
import loginTour from './tour';

const LoginIndex: React.FC = () => {
  const [
    getToken,
    { data: getTokenData, error: getTokenError, loading: getTokenLoading },
  ] = useLazyQuery<LoginGetTokenQuery, LoginGetTokenQueryVariables>(
    LOGIN_GET_TOKEN_QUERY,
    {
      fetchPolicy: 'no-cache',
    },
  );
  const { data: meUserData, error: meUserDataError } = useQuery<
    LoginMeUserQuery
  >(LOGIN_ME_USER_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const { data: meUserDataCached } = useQuery<LoginMeUserQuery>(
    LOGIN_ME_USER_QUERY,
    {
      fetchPolicy: 'cache-first',
    },
  );
  const [automaticallyLogged, setAutomaticallyLogged] = useState(false);
  const router = useRouter();
  const tour = useTour();

  useEffect(() => {
    tour.start({ steps: loginTour, defaultNamespace: namespaces.pages.login });
  }, []);

  const submitHandler = (email: string, password: string): void => {
    cookie.remove(config.tokenCookie);
    getToken({ variables: { username: email, password } });
  };

  const { enqueueSnackbar } = useSnackbar();

  const automaticallyLogIn = (): void => {
    if (!automaticallyLogged) {
      setAutomaticallyLogged(true);
      router.push(routes.dashboard.index);
      enqueueSnackbar('Byli jste automaticky přihlášeni', {
        variant: 'success',
      });
    }
  };

  if (meUserData) {
    if (!automaticallyLogged) {
      automaticallyLogIn();
    }
  } else if (
    recognizeError(meUserDataError) === errors.network.failedToFetch &&
    meUserDataCached
  ) {
    automaticallyLogIn();
  }

  if (!getTokenLoading) {
    if (getTokenError) {
      if (recognizeError(getTokenError) === errors.network.failedToFetch) {
        enqueueSnackbar('noInternet', {
          variant: 'warning',
        });
      } else {
        enqueueSnackbar('noMatch', {
          variant: 'error',
        });
      }
    }
    if (getTokenData?.getToken) {
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
export default compose(withNamespaces(loginNamespaces), withApollo)(LoginIndex);
