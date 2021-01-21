import React, { useEffect, useState } from 'react';

import { fade, makeStyles, Theme } from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import { leftShadow } from 'components/shadows';

import { SideDialogProps } from './types';

const transitionDuration = 500;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 0,
    height: '100%',
    position: 'absolute',
    zIndex: 501,
    transition: `${transitionDuration}ms`,
    top: 0,
    right: 0,
    backgroundColor: fade(theme.palette.common.black, 0),
  },
  rootBig: {
    width: '100%',
    backgroundColor: fade(theme.palette.common.black, 0.5),
  },
  side: {
    ...leftShadow,
    backgroundColor: 'white',
    height: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 502,
    overflowY: 'scroll',

    transitionDuration: `${transitionDuration}ms`,
  },
  sideHidden: {
    display: 'none',
  },
  sideReduced: {
    width: 0,
  },
  sideVisible: {
    width: 800,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content: {
    transitionDuration: `${transitionDuration / 2}ms`,
    height: '100%',
  },
}));

const SideDialog: React.FC<SideDialogProps> = props => {
  const classes = useStyles();
  const [phase, setPhase] = useState('hidden');

  useEffect(() => {
    if (props.open) {
      setPhase('reduced');
      setTimeout(() => {
        setPhase('withoutContent');
        setTimeout(() => {
          setPhase('visible');
        }, transitionDuration);
      });
    } else if (phase !== 'hidden') {
      setPhase('withoutContent');
      setTimeout(() => {
        setPhase('reduced');
        setTimeout(() => {
          setPhase('hidden');
        }, transitionDuration);
      }, transitionDuration / 2);
    }
  }, [props.open]);

  let sideClass = `${classes.side} `;
  if (phase === 'hidden') sideClass += classes.sideHidden;
  if (phase === 'reduced') sideClass += classes.sideReduced;
  if (phase === 'visible' || phase === 'withoutContent')
    sideClass += classes.sideVisible;

  let rootClass = `${classes.root} `;
  if (phase !== 'hidden' && phase !== 'reduced') rootClass += classes.rootBig;

  return (
    <div className={rootClass}>
      <div className={sideClass}>
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading || false} />
          <div
            className={classes.content}
            style={phase === 'visible' ? { opacity: 1 } : { opacity: 0 }}
          >
            {props.children}
          </div>
        </OverlayLoadingContainer>
      </div>
    </div>
  );
};

export default SideDialog;
