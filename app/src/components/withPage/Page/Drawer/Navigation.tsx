import React from 'react';

import {
  fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import navigationList from './navigationList';

const useStyles = makeStyles((theme: Theme) => ({
  selectedItem: {
    backgroundColor: `${fade(theme.palette.secondary.light, 0.5)} !important`,
  },
  selectedItemColor: {
    color: theme.palette.common.black,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));
const Navigation: React.FC = () => {
  const classes = useStyles();

  const { t } = useTranslation(namespaces.other.pages);
  const router = useRouter();

  const mappedNavigation = navigationList.map(item => {
    const selected = router.pathname === item.href;

    return (
      <Link key={item.label + item.href} href={item.href}>
        <a className={classes.link} href={item.href}>
          <ListItem
            button
            selected={selected}
            classes={selected ? { root: classes.selectedItem } : {}}
            className={selected ? classes.selectedItem : ''}
          >
            <ListItemIcon className={selected ? classes.selectedItemColor : ''}>
              {item.icon}
            </ListItemIcon>
            <ListItemText className={selected ? classes.selectedItemColor : ''}>
              {t(item.label)}
            </ListItemText>
          </ListItem>
        </a>
      </Link>
    );
  });

  return <List>{mappedNavigation}</List>;
};

export default Navigation;
