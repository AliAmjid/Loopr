import { ErrorResponse } from '@apollo/client/link/error';
import { VariantType } from 'notistack';

import { GraphqlErrorWithLooprError } from 'lib/apollo/recognizeError/types';

import {
  BAD_MARK_SYSTEM,
  CHECK_ACCESS,
  DUPLICATE_VALUE,
  EMPTY_GROUP_CLASS_GROUP,
  FAILED_TO_FETCH,
  INVALID_IRI,
  INVALID_ROLE_CONFIG,
  NO_SCHOOL_PERIOD_ACTIVE,
  OLD_PASSWORD_IS_WRONG,
  SCHOOL_PERIODS_VALIDATION_ERROR,
  UNEXPECTED_VALUE,
  USER_CAN_NOT_BE_TAUGHT,
  USER_IS_NOT_TEACHER,
  USER_NOT_EXAM_MEMBER,
  USER_NOT_FOUND,
  VALIDATION_ERROR,
} from './errors';

const recognizeError = (
  error: ErrorResponse,
): {
  message: string;
  variant: VariantType;
} => {
  const { networkError } = error;
  if (networkError) {
    if (networkError.message === FAILED_TO_FETCH) {
      return { message: 'No internet', variant: 'warning' };
    }
  }

  const hasErrorCode = (
    errors: ReadonlyArray<GraphqlErrorWithLooprError>,
    code: string,
  ): boolean => {
    return errors.some(error => error['loopr-error']?.code === code);
  };

  const graphqlErrors: ReadonlyArray<GraphqlErrorWithLooprError> | undefined =
    error.graphQLErrors;

  if (graphqlErrors) {
    if (hasErrorCode(graphqlErrors, INVALID_ROLE_CONFIG))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_NOT_FOUND))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, VALIDATION_ERROR))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, UNEXPECTED_VALUE))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, DUPLICATE_VALUE))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, OLD_PASSWORD_IS_WRONG))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_IS_NOT_TEACHER))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, EMPTY_GROUP_CLASS_GROUP))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_CAN_NOT_BE_TAUGHT))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, INVALID_IRI))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, CHECK_ACCESS))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, SCHOOL_PERIODS_VALIDATION_ERROR))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, NO_SCHOOL_PERIOD_ACTIVE))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, BAD_MARK_SYSTEM))
      return { message: '', variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_NOT_EXAM_MEMBER))
      return { message: '', variant: 'error' };
  }

  return { message: 'unexpected error', variant: 'error' };
};

export default recognizeError;
