import React from 'react';

import { useLazyQuery } from '@apollo/react-hooks';

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

  console.log(loading, data, error);

  return (
    <>
      <Login onSubmit={submitHandler} />
    </>
  );
};

const LoginIndexWithTour = withNamespaces(
  withTour(LoginIndex, loginTour, 'login'),
  ['login', 'common'],
);

export default withApollo(LoginIndexWithTour);
