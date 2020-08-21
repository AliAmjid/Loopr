import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import navigationList from 'components/withPage/Page/Drawer/navigationList';

const Navigation = (): JSX.Element => {
  const { t } = useTranslation(namespaces.other.pages);
  const router = useRouter();

  const mappedNavigation = navigationList.map(item => (
    <Link key={item.label + item.href} href={item.href} passHref>
      <ListItem button selected={router.pathname === item.href}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>{t(item.label)}</ListItemText>
      </ListItem>
    </Link>
  ));

  return <List>{mappedNavigation}</List>;
};

export default Navigation;
