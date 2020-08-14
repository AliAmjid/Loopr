import React from 'react';

import { Link as MUILink } from '@material-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends NextLinkProps {
  children: JSX.Element | string;
}

const Link = (props: LinkProps): JSX.Element => (
  <NextLink {...props} passHref>
    <MUILink>{props.children}</MUILink>
  </NextLink>
);

export default Link;
