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
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';

import EditableListItem from 'components/EditableListItem';
import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import { rightShadow } from 'components/shadows';

import { SideListProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    ...rightShadow,
    height: '100%',
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

const SideList: React.FC<SideListProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

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
    style = { maxHeight: window.innerHeight - toolbarHeight * 3 };
  }

  return (
    <div className={classes.container} style={style}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading || false} />
        <div className={classes.header}>
          <Typography variant="h6">{props.title}</Typography>
          {props.filter !== undefined && (
            <TextField
              label={t('actions.search')}
              fullWidth
              value={props.filter}
              onChange={e => {
                if (props.onFilterChange) props.onFilterChange(e.target.value);
              }}
            />
          )}
        </div>
        <List>{mappedItems}</List>
        <Box
          position="sticky"
          width="100%"
          pt={2}
          bottom={theme.spacing(2)}
          display={props?.bottomAction ? 'flex' : 'none'}
          justifyContent="center"
          onClick={props.bottomAction?.onClick}
        >
          {props.bottomAction && (
            <Tooltip title={props.bottomAction.tooltip || ''}>
              <Fab color="primary">{props.bottomAction.icon}</Fab>
            </Tooltip>
          )}
        </Box>
      </OverlayLoadingContainer>
    </div>
  );
};

export default SideList;
