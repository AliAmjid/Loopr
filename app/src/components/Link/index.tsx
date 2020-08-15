import React from 'react';

import { Link as MUILink } from '@material-ui/core';
import { LinkProps as NextLinkProps } from 'next/link';

import { Link as LinkPrefab } from 'lib/i18n';

interface LinkProps extends NextLinkProps {
  children: JSX.Element | string;
}

const Link = (props: LinkProps): JSX.Element => (
  <LinkPrefab {...props} passHref>
    <MUILink>{props.children}</MUILink>
  </LinkPrefab>
);

export default Link;
