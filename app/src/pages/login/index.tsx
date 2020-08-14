import React from 'react';

import withNamespaces from 'lib/i18n/withNamespaces';
import withTour from 'lib/reactour/withTour';

import Login from 'pages/login/login';
import loginTour from 'pages/login/tour';

const LoginIndex = (): JSX.Element => {
  const submitHandler = (email: string, password: string): void => {
    // eslint-disable-next-line no-alert
    alert(`${email} ${password}`);
  };

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

export default LoginIndexWithTour;
