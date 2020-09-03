import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import navigationList from './navigationList';

const Navigation: React.FC = () => {
  const { t } = useTranslation(namespaces.other.pages);
  const router = useRouter();

  const mappedNavigation = navigationList.map(item => (
    <Link key={item.label + item.href} href={item.href}>
      <ListItem button selected={router.pathname === item.href}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>{t(item.label)}</ListItemText>
      </ListItem>
    </Link>
  ));

  return <List>{mappedNavigation}</List>;
};

export default Navigation;
