import React, { useEffect, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { setInterval } from 'timers';

import { EditProps } from 'pages/teacherSubjects/subject/edit/types';

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

const Edit: React.FC<EditProps> = props => {
  const classes = useStyles();
  const [style, setStyle] = useState({ width: 400, opacity: 1 });

  useEffect(() => {
    setStyle({ width: 400, opacity: 0 });
    if (props.open) {
      setStyle(prevState => ({
        width: 400,
        opacity: 1,
      }));
    } else {
      setStyle(prevState => ({
        width: 0,
        opacity: 0,
      }));
    }
  }, [props.open]);

  return (
    <div className={classes.root} style={style}>
      ahoj
    </div>
  );
};

export default Edit;
