import { Overrides } from '@material-ui/core/styles/overrides';

import shape from 'lib/material-ui/theme/shape';
import spacing from 'lib/material-ui/theme/spacing';

const list: Overrides = {
  MuiList: {
    root: {
      padding: +spacing,
      paddingLeft: +spacing + spacing / 2,
      paddingRight: +spacing + spacing / 2,
    },
  },
  MuiListItem: {
    root: {
      borderRadius: shape.borderRadius,
      paddingTop: spacing / 2,
      paddingBottom: spacing / 2,

      marginTop: spacing / 2,
      marginBottom: spacing / 2,
    },
  },
};

export default list;
