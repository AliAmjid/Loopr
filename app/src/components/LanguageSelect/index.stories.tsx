import React from 'react';

import { select } from '@storybook/addon-knobs';

import withDecorators from 'lib/storybook/withDecorators';

import LanguageSelect from './index';

export default withDecorators({
  title: 'LanguageSelect',
});

export const Basic = (): JSX.Element => (
  <LanguageSelect
    size={select('size', { medium: 'medium', small: 'small' }, 'medium')}
  />
);
