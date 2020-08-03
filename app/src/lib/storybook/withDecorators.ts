import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { muiTheme } from 'storybook-addon-material-ui';

import theme from 'lib/material-ui/theme';

const withDecorators = (config: Record<string, any>): Record<string, any> => {
  config.decorators = [muiTheme([theme]), withKnobs, withA11y];

  return config;
};

export default withDecorators;
