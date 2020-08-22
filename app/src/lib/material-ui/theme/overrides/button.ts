import { fade } from '@material-ui/core';
import { Overrides } from '@material-ui/core/styles/overrides';
import transitions from '@material-ui/core/styles/transitions';

import palette from '../palette';
import shape from '../shape';
import customTransition from '../transitions';

const shared = {
  transition: transitions.create('background-color', {
    duration: customTransition.duration?.standard,
  }),
  borderRadius: shape.borderRadius,
  '&:hover': {
    backgroundColor: fade(palette.common?.white || '#fff', 0.15),
  },
};

const button: Overrides = {
  MuiIconButton: {
    root: {
      ...shared,
    },
    colorInherit: {
      ...shared,
    },
    colorPrimary: {
      ...shared,
    },
    colorSecondary: {
      ...shared,
    },
  },
  MuiTouchRipple: {
    child: {
      borderRadius: shape.borderRadius,
    },
  },
};

export default button;
