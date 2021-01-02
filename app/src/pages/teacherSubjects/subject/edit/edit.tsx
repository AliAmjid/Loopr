import React, { useEffect, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { setInterval } from 'timers';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'red',
    height: '100%',
    width: 0,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.appBar + 3,
    transitionDuration: '500ms',
  },
}));

const Edit: React.FC = () => {
  const classes = useStyles();
  const [style, setStyle] = useState({ width: 400, opacity: 1 });

  useEffect(() => {
    setStyle({ width: 400, opacity: 0 });
    /* setInterval(() => {
      console.log(
        'ahoj',
        { width: style.width === 400 ? 0 : 400 },
        style.width === 400,
      );
      setStyle(prevState => ({
        width: prevState.width === 400 ? 0 : 400,
        opacity: prevState.width === 400 ? 0 : 1,
      }));
    }, 2000);
 */
  }, []);

  return (
    <div className={classes.root} style={style}>
      ahoj
    </div>
  );
};

export default Edit;
