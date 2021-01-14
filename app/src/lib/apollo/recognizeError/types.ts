import { GraphQLError } from 'graphql';

export interface GraphqlErrorWithLooprError extends GraphQLError {
  'loopr-error'?: {
    msg: string;
    code: string;
  };
}
