import React, { useEffect, useState } from 'react';

import {
  CircularProgress,
  fade,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';

import { OverlayLoadingProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: theme.zIndex.appBar + 10,
    borderRadius: 'inherit',
    transition: theme.transitions.create('opacity'),
  },
  middle: {
    display: 'table',
    width: '100%',
    height: '100%',
    backgroundColor: fade(theme.palette.background.paper, 0.7),
    borderRadius: 'inherit',
  },
  child: {
    display: 'table-cell',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
}));

const OverlayLoading: React.FC<OverlayLoadingProps> = ({ loading }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [hidden, setHidden] = useState(!loading);
  const [visible, setVisible] = useState(loading);
  useEffect(() => {
    if (loading) {
      setVisible(false);
      setHidden(false);
      setTimeout(() => setVisible(true));
    } else if (visible && !hidden) {
      setVisible(false);
      setTimeout(() => setHidden(true), theme.transitions.duration.standard);
    }
  }, [loading]);

  useEffect(() => {
    setVisible(visible);
    setHidden(!visible);
  }, []);

  return (
    <>
      {!hidden && (
        <div
          className={`${classes.root} ${
            visible ? classes.visible : classes.hidden
          }`}
        >
          <div className={classes.middle}>
            <div className={classes.child}>
              <CircularProgress />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverlayLoading;
