import React from 'react';

import App from 'pages/_app';

const withApp = (Component: JSX.Element) => (): JSX.Element => (
  <App Component={() => Component} />
);

export default withApp;
