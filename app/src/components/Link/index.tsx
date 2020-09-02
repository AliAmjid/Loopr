import React, { PropsWithChildren } from 'react';

import { Link as MUILink, LinkBaseProps } from '@material-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const Link: React.FC<
  PropsWithChildren<NextLinkProps> & LinkBaseProps
> = props => (
  <NextLink {...props} passHref>
    <MUILink {...props}>{props.children}</MUILink>
  </NextLink>
);

export default Link;
