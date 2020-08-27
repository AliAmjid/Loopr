import React from 'react';

import { Typography } from '@material-ui/core';
import BreadcrumbsPrefab from '@material-ui/core/Breadcrumbs';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Link from 'components/Link';

import { BreadcrumbsProps } from './types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = props => {
  const { t } = useTranslation(namespaces.other.pages);
  const mappedItems = props.breadcrumbs.map((item, index) => {
    if (!item.href || index === props.breadcrumbs.length - 1)
      return (
        <Typography key={item.label + index.toString()}>
          {t(item.label)}
        </Typography>
      );

    return (
      <Link
        key={item.label + index.toString()}
        href={item?.href || ''}
        color="inherit"
      >
        {t(item.label)}
      </Link>
    );
  });

  return <BreadcrumbsPrefab>{mappedItems}</BreadcrumbsPrefab>;
};

export default Breadcrumbs;
