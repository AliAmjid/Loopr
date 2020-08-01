import React from 'react';

import withNamespaces from 'lib/i18n/withNamespaces';
import withTour from 'lib/reactour/withTour';

import Login from 'pages/login/login';
import loginTour from 'pages/login/tour';

const LoginIndex = (): JSX.Element => {
  const submitHandler = (email: string, password: string): void => {
    alert(`${email} ${password}`);
  };

  return (
    <>
      <Login onSubmit={submitHandler} />
    </>
  );
};

const LoginIndexWithTour = withNamespaces(
  // withTour(LoginIndex, loginTour, 'login'),
  LoginIndex,
  ['login', 'common'],
);

export default LoginIndexWithTour;
