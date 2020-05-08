import React from 'react';

import withTour from 'lib/reactour/withTour';

import Login from 'pages/login/login';
import loginSteps from 'pages/login/steps';

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

LoginIndex.getInitialProps = async () => ({
  namespacesRequired: ['login', 'common'],
});

export default withTour(LoginIndex, loginSteps);
