import React, { useState } from 'react';

import {
  Box,
  Fab,
  fade,
  List,
  ListItem,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';

import EditableListItem from 'components/EditableListItem';
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
    paddingTop: theme.spacing(4),
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: 10,
  },
  selectedItem: {
    backgroundColor: `${fade(theme.palette.secondary.light, 0.5)} !important`,
  },
}));

const SideTable: React.FC<SideTableProps> = props => {
  const classes = useStyles();

  const [selected, setSelected] = useState<number | string | undefined>(
    undefined,
  );

  const mappedItems = props.items.map(item => {
    const itemSelected = item.id === selected;

    return (
      <ListItem
        key={item.id}
        button
        selected={itemSelected}
        onClick={() => {
          setSelected(item.id);
          if (item.onClick) {
            item.onClick();
          }
        }}
        className={itemSelected ? classes.selectedItem : ''}
      >
        <EditableListItem
          edit="primary"
          primary={item.primary}
          secondary={item.secondary}
          onSubmit={value => {
            if (item.onValueChange) {
              return item.onValueChange(value);
            }

            return Promise.resolve(false);
          }}
          editingDisabled={!item.onValueChange}
          additionalActions={item.additionalActions}
        />
      </ListItem>
    );
  });

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
