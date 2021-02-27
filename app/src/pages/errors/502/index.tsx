import React from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import routes from 'config/routes';

import withApollo from 'lib/apollo/withApollo';

import BadGatewayError from 'pages/errors/502/502';

import ERRORS_502_PING_QUERY from './queries/ping';

const BadGatewayErrorIndex: React.FC = () => {
  const router = useRouter();
  const { data, error } = useQuery(ERRORS_502_PING_QUERY, {
    pollInterval: 1000 * 10,
  });

  if (data && !error) {
    // eslint-disable-next-line prefer-const
    let { pathname, ...query } = router.query;
    if (pathname === router.pathname) {
      pathname = routes.dashboard.index;
    }
    if (!pathname) pathname = routes.dashboard.index;

    router.push({
      pathname: `${pathname}`,
      query,
    });
  }

  return <BadGatewayError />;
};

export default withApollo(BadGatewayErrorIndex);
