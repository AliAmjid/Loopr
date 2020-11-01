import React from 'react';

import { List, ListItem, makeStyles, Theme } from '@material-ui/core';

import { HorizontalListProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listItem: {
    flex: '25%',
    [theme.breakpoints.down('md')]: {
      flex: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      flex: '100%',
    },
  },
}));

const HorizontalList: React.FC<HorizontalListProps> = props => {
  const classes = useStyles();
  const mappedChildren = props.children.map((ch, index) => (
    <ListItem key={index} className={classes.listItem}>
      {ch}
    </ListItem>
  ));

  return <List className={classes.list}>{mappedChildren}</List>;
};

export default HorizontalList;
