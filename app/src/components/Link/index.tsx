import React, { PropsWithChildren } from 'react';

import { Link as MUILink } from '@material-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const Link = (props: PropsWithChildren<NextLinkProps>): JSX.Element => (
  <NextLink {...props} passHref>
    <MUILink>{props.children}</MUILink>
  </NextLink>
);

export default Link;
