import React, { PropsWithChildren } from 'react';

import { Link as MUILink, LinkBaseProps } from '@material-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const Link: React.FC<
  PropsWithChildren<NextLinkProps> & LinkBaseProps
> = props => {
  const { href, ...rest } = props;

  return (
    <NextLink href={href} passHref>
      <MUILink {...rest}>{props.children}</MUILink>
    </NextLink>
  );
};

export default Link;
