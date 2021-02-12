import React from 'react';

import withApollo from 'lib/apollo/withApollo';

import BadGatewayError from 'pages/errors/502/502';

const BadGatewayErrorIndex: React.FC = () => {
  return <BadGatewayError />;
};

export default withApollo(BadGatewayErrorIndex);
