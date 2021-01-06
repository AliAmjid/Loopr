import { ApolloError } from '@apollo/client';

import { GraphqlErrorWithLooprError } from 'lib/apollo/recognizeError/types';

import errors from './errors';

const recognizeError = (error: ApolloError | undefined): string | undefined => {
  if (!error) return undefined;

  const { networkError } = error;
  if (networkError) {
    switch (networkError.message) {
      case errors.network.failedToFetch:
        return errors.network.failedToFetch;
      default:
        return undefined;
    }
  }

  const graphqlErrors: ReadonlyArray<GraphqlErrorWithLooprError> =
    error.graphQLErrors;

  if (
    graphqlErrors.some(
      e => e['loopr-error']?.code === errors.looprError.noSchoolPeriodActive,
    )
  ) {
    return errors.looprError.noSchoolPeriodActive;
  }

  return undefined;
};

export default recognizeError;
