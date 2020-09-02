import React from 'react';

import { select, text } from '@storybook/addon-knobs';

import withDecorators from 'lib/storybook/withDecorators';

import Help from './index';

export default withDecorators({ title: 'Help' });

export const Basic: React.FC = () => (
  <Help
    path={text('path', '')}
    size={select('size', { medium: 'medium', small: 'small' }, 'medium')}
  />
);
