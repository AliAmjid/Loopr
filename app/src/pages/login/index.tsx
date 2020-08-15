import React from 'react';

import { useLazyQuery } from '@apollo/client';
import cookie from 'js-cookie';

import config from 'config';

import withApollo from 'lib/apollo/withApollo';
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
  const submitHandler = (email: string, password: string): void => {
    getToken({ variables: { username: email, password } });
  };

  if (!loading) {
    if (error) {
      alert('error');
    }
    if (data) {
      cookie.set(config.tokenCookie, data.getToken.token);
    }
  }

  return (
    <>
      <Login onSubmit={submitHandler} />
    </>
  );
};

export default withNamespaces(
  withApollo(withTour(LoginIndex, loginTour, 'login')),
  ['login', 'common'],
);
