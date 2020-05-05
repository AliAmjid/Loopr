import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

const withDecorators = (config: Record<string, any>): Record<string, any> => {
  config.decorators = [withKnobs, withA11y];

  return config;
};

export default withDecorators;
