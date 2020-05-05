import React from 'react';

import Login from 'pages/login/login';

const LoginIndex = (): JSX.Element => {
  const submitHandler = (email: string, password: string): void => {
    alert(`${email} ${password}`);
  };

  return <Login onSubmit={submitHandler} />;
};

LoginIndex.getInitialProps = async () => ({
  namespacesRequired: ['login', 'common'],
});

export default LoginIndex;
