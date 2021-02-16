import React, { useEffect } from 'react';

import withApollo from 'lib/apollo/withApollo';

import BadGatewayError from 'pages/errors/502/502';

const BadGatewayErrorIndex: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {}, 1000 * 10);
  }, []);

  return <BadGatewayError />;
};

export default withApollo(BadGatewayErrorIndex);
