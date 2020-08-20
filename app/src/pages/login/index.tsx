import React from 'react';

import { useLazyQuery } from '@apollo/client';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { compose } from 'recompose';

import config from 'config';
import routes from 'config/routes';

import withApollo from 'lib/apollo/withApollo';
import { namespaces } from 'lib/i18n';
import withNamespaces from 'lib/i18n/withNamespaces';
import withTour from 'lib/reactour/withTour';

import getTokenQuery, {
  GetTokenQuery,
  GetTokenQueryVars,
} from './getToken.query';
import Login from './login';
import loginTour from './tour';

const LoginIndex = (): JSX.Element => {
  const [getToken, { data, error, loading }] = useLazyQuery<
    GetTokenQuery,
    GetTokenQueryVars
  >(getTokenQuery, { fetchPolicy: 'no-cache' });
  const router = useRouter();

  const submitHandler = (email: string, password: string): void => {
    getToken({ variables: { username: email, password } });
  };

  const { enqueueSnackbar } = useSnackbar();

  if (!loading) {
    if (error) {
      enqueueSnackbar('Zadané údaje se neshodují', {
        variant: 'error',
      });
    }
    if (data) {
      cookie.set(config.tokenCookie, data.getToken.token);
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
