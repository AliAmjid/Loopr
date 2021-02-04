import React from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import routes from 'config/routes';

import withApollo from 'lib/apollo/withApollo';

import BadGatewayError from 'pages/errors/502/502';

import { Errors502MeUserQuery } from 'types/graphql';

import ERRORS_502_ME_USER_QUERY from './queries/meUser';

const BadGatewayErrorIndex: React.FC = () => {
  const router = useRouter();

  return <BadGatewayError />;
};

export default withApollo(BadGatewayErrorIndex);
