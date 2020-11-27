import React from 'react';

import {
  Box,
  Fab,
  fade,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { SideTableProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxHeight: '100%',
    boxShadow: '5px 0px 4px -1px rgba(0,0,0,0.2)',
    padding: theme.spacing(2),
    paddingTop: 0,
    overflowY: 'scroll',
  },
  header: {
    paddingTop: theme.spacing(2),
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: 10,
  },
  selectedItem: {
    backgroundColor: `${fade(theme.palette.secondary.light, 0.5)} !important`,
  },
  selectedItemColor: {
    color: theme.palette.common.black,
  },
}));

const SideTable: React.FC<SideTableProps> = props => {
  const classes = useStyles();

  const mappedItems = props.items.map(item => (
    <ListItem
      key={item.id}
      button
      selected={item.selected || false}
      onClick={() => {
        if (item.onClick) {
          item.onClick();
        }
      }}
      className={item.selected ? classes.selectedItem : ''}
    >
      <ListItemText primary={item.primary} secondary={item.secondary} />
      <ListItemSecondaryAction>
        <IconButton className={item.selected ? classes.selectedItemColor : ''}>
          <EditIcon />
        </IconButton>
        <IconButton className={item.selected ? classes.selectedItemColor : ''}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  let style = {};

  if (process.browser) {
    const toolbarHeight = 64;
    style = { maxHeight: window.innerHeight - toolbarHeight * 2 };
  }

  return (
    <div className={classes.container} style={style}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading || false} />
        <div className={classes.header}>
          <Typography variant="h6">{props.title}</Typography>
          <TextField label="Find" fullWidth />
        </div>
        <List>{mappedItems}</List>
        <Box
          position="sticky"
          width="100%"
          bottom={0}
          display={props?.bottomAction ? 'flex' : 'none'}
          justifyContent="center"
          onClick={props.bottomAction?.onClick}
        >
          <Fab color="primary">
            <>{props.bottomAction?.icon}</>
          </Fab>
        </Box>
      </OverlayLoadingContainer>
    </div>
  );
};

export default SideTable;
