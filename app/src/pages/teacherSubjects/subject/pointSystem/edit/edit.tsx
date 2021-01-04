import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  fade,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { bottomShadow, leftShadow } from 'components/shadows';

import { EditProps } from './types';

const transitionDuration = 500;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.common.black,
  },
  side: {
    ...leftShadow,
    backgroundColor: 'white',
    height: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.appBar + 3,
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
  header: { ...bottomShadow },
  headerInfo: {
    minWidth: 200,
  },
  headerActions: {
    width: '100%',
  },
  content: {
    transitionDuration: `${transitionDuration / 2}ms`,
  },
}));

const Edit: React.FC<EditProps> = props => {
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
    } else {
      setPhase('withoutContent');
      setTimeout(() => {
        setPhase('reduced');
        setTimeout(() => {
          setPhase('hidden');
        }, 1000);
      }, transitionDuration / 2);
    }
  }, [props.open]);

  let sideClass = `${classes.side} `;
  if (phase === 'hidden') sideClass += classes.sideHidden;
  if (phase === 'reduced') sideClass += classes.sideReduced;
  if (phase === 'visible' || phase === 'withoutContent')
    sideClass += classes.sideVisible;

  return (
    <div className={classes.root}>
      <div className={sideClass}>
        <div
          className={classes.content}
          style={phase === 'visible' ? { opacity: 1 } : { opacity: 0 }}
        >
          <Box
            p={2}
            display="flex"
            alignItems="center"
            className={classes.header}
          >
            <Box
              display="flex"
              alignItems="center"
              className={classes.headerInfo}
            >
              <Box>
                <Typography>Anglický jazyk</Typography>
                <Typography variant="h5">Test1</Typography>
                <Typography>27.12.2020</Typography>
              </Box>
              <Box pl={4}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              className={classes.headerActions}
              display="flex"
              justifyContent="flex-end"
            >
              <Button color="primary" onClick={props.onCancel}>
                Cancel
              </Button>
              <Box pl={2}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={props.onSubmit}
                >
                  Save and close
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box p={2}>
              <TextField label="Max points" type="number" />
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={250}>Name</TableCell>
                  <TableCell width={250}>Lastname</TableCell>
                  <TableCell />
                  <TableCell width={100}>Points</TableCell>
                  <TableCell width={100}>Percents</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Jméno</TableCell>
                  <TableCell>Příjení</TableCell>
                  <TableCell />
                  <TableCell>
                    <TextField />
                  </TableCell>
                  <TableCell>
                    <TextField />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jméno</TableCell>
                  <TableCell>Příjení</TableCell>
                  <TableCell />
                  <TableCell>
                    <TextField />
                  </TableCell>
                  <TableCell>
                    <TextField />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Edit;
