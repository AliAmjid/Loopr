import { ErrorResponse } from '@apollo/client/link/error';
import { TFunction } from 'next-i18next';
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
  SCHOOL_PERIOD_VALIDATION_ERROR,
  UNEXPECTED_VALUE,
  USER_CAN_NOT_BE_TAUGHT,
  USER_IS_NOT_TEACHER,
  USER_NOT_EXAM_MEMBER,
  USER_NOT_FOUND,
  VALIDATION_ERROR,
} from './errors';

const recognizeError = (
  error: ErrorResponse,
  t: TFunction,
): {
  message: string;
  variant: VariantType;
} => {
  const { networkError } = error;
  if (networkError) {
    if (networkError.message === FAILED_TO_FETCH) {
      return { message: t('errors.noInternet'), variant: 'warning' };
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
      return { message: t('errors.invalidRoleConfig'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_NOT_FOUND))
      return { message: t('errors.userNotFound'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, VALIDATION_ERROR))
      return { message: t('errors.commonError'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, UNEXPECTED_VALUE))
      return { message: t('errors.commonError'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, DUPLICATE_VALUE))
      return { message: t('errors.duplicateValue'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, OLD_PASSWORD_IS_WRONG))
      return { message: t('errors.oldPasswordIsWrong'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_IS_NOT_TEACHER))
      return { message: t('errors.userIsNotTeacher'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, EMPTY_GROUP_CLASS_GROUP))
      return { message: t('errors.emptyGroupClassGroup'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_CAN_NOT_BE_TAUGHT))
      return { message: t('errors.commonError'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, INVALID_IRI))
      return { message: t('errors.commonError'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, CHECK_ACCESS))
      return { message: t('errors.checkAccess'), variant: 'warning' };
    if (hasErrorCode(graphqlErrors, SCHOOL_PERIOD_VALIDATION_ERROR))
      return {
        message: t('errors.schoolPeriodValidationError'),
        variant: 'error',
      };
    if (hasErrorCode(graphqlErrors, NO_SCHOOL_PERIOD_ACTIVE))
      return { message: t('errors.noSchoolPeriodActive'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, BAD_MARK_SYSTEM))
      return { message: t('errors.commonError'), variant: 'error' };
    if (hasErrorCode(graphqlErrors, USER_NOT_EXAM_MEMBER))
      return { message: t('errors.commonError'), variant: 'error' };
  }

  return { message: t('errors.unexpectedError'), variant: 'error' };
};

export default recognizeError;
