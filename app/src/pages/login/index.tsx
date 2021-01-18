import React, { useEffect, useState } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { compose } from 'recompose';

import routes from 'config/routes';

import withApollo from 'lib/apollo/withApollo';
import { useTranslation } from 'lib/i18n';
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
  const { data: meUserData } = useQuery<LoginMeUserQuery>(LOGIN_ME_USER_QUERY, {
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
  const { t } = useTranslation(namespaces.pages.login);

  useEffect(() => {
    tour.start({ steps: loginTour, defaultNamespace: namespaces.pages.login });
  }, []);

  const submitHandler = (email: string, password: string): void => {
    cookie.remove(`${process.env.NEXT_PUBLIC_TOKEN_COOKIE}`);
    getToken({ variables: { email, password } });
  };

  const { enqueueSnackbar } = useSnackbar();

  const automaticallyLogIn = (): void => {
    if (!automaticallyLogged) {
      setAutomaticallyLogged(true);
      router.push(routes.dashboard.index);
      enqueueSnackbar(t('automaticLogin'), {
        variant: 'success',
      });
    }
  };

  if (meUserData) {
    if (!automaticallyLogged) {
      automaticallyLogIn();
    }
  } else if (meUserDataCached) {
    automaticallyLogIn();
  }

  if (!getTokenLoading) {
    if (getTokenData?.getToken) {
      enqueueSnackbar(t('success'), { variant: 'success' });
      cookie.set(
        `${process.env.NEXT_PUBLIC_TOKEN_COOKIE}`,
        getTokenData.getToken.token,
      );
      router.push(routes.dashboard.index);
    }
  }

  return (
    <>
      <Login onSubmit={submitHandler} loading={getTokenLoading} />
    </>
  );
};
export default compose(withNamespaces(loginNamespaces), withApollo)(LoginIndex);
