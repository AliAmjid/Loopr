import { fade } from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import { Overrides } from '@material-ui/core/styles/overrides';
import transitions from '@material-ui/core/styles/transitions';

import palette from '../palette';
import shape from '../shape';

import list from './list';

const overrides: Overrides = {
  ...list,

  MuiIconButton: {
    root: {
      transition: transitions.create('background-color'),
      '&:hover': {
        backgroundColor: fade(palette.common?.white || '#fff', 0.15),
      },
    },
    colorInherit: {
      transition: transitions.create('background-color'),
      '&:hover': {
        backgroundColor: fade(palette.common?.white || '#fff', 0.15),
      },
    },
  },
};

export default overrides;
