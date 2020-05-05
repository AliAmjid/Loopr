import React from 'react';

import LoginIndex from 'pages/login';

import withDecorators from 'lib/storybook/withDecorators';

export default withDecorators({
  title: 'test',
});

export const loginIndex = (): JSX.Element => <LoginIndex />;
