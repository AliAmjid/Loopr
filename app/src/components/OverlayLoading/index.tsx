import React from 'react';

import { CircularProgress, fade, makeStyles, Theme } from '@material-ui/core';

import { OverlayLoadingProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 11,
    borderRadius: 'inherit',
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

  return (
    <>
      {loading && (
        <div className={classes.root}>
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
