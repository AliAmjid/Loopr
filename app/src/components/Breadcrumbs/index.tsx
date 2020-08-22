import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';
import BreadcrumbsPrefab from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';

import Link from 'components/Link';

import { BreadcrumbsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const classes = useStyles();
  const mappedItems = props.breadcrumbs.map((item, index) => {
    if (!item.href || index === props.breadcrumbs.length - 1)
      return (
        <Typography
          key={item.label + index.toString()}
          className={classes.link}
        >
          {item.label}
        </Typography>
      );

    return (
      <Link
        key={item.label + index.toString()}
        className={classes.link}
        href={item?.href || ''}
        color="inherit"
      >
        <HomeIcon className={classes.icon} />
        {item.label}
      </Link>
    );
  });

  return <BreadcrumbsPrefab>{mappedItems}</BreadcrumbsPrefab>;
};

export default Breadcrumbs;
