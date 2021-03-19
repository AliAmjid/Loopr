import React, { useContext, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import routes from 'config/routes';

import accessContext from 'lib/apollo/accessContext';
import { FAILED_TO_FETCH } from 'lib/apollo/recognizeError/errors';
import withApollo from 'lib/apollo/withApollo';

import BadGatewayError from 'pages/errors/502/502';

import ERRORS_502_PING_QUERY from './queries/ping';

const BadGatewayErrorIndex: React.FC = () => {
  const router = useRouter();
  useQuery(ERRORS_502_PING_QUERY, {
    pollInterval: 1000 * 10,
  });
  const access = useContext(accessContext);

  const [redirect, setRedirect] = useState(false);

  if (access.value !== FAILED_TO_FETCH) {
    setTimeout(() => {
      setRedirect(true);
    }, 0);
  }

  if (redirect) {
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
