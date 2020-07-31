import React from 'react';

import withApp from 'lib/storybook/withApp';
import withDecorators from 'lib/storybook/withDecorators';

import App from 'pages/_app';
import LoginIndex from 'pages/login';

export default withDecorators({
  title: 'test',
});

export const loginIndex = withApp(<App Component={() => <LoginIndex />} />);
