import React from 'react';

import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n/';
import namespaces from 'lib/i18n/namespaces';

import {
  ProfileUpdatePercentsToMarkConverterMutation,
  ProfileUpdatePercentsToMarkConverterMutationVariables,
} from 'types/graphql';

import { PercentsValues } from 'components/PercentsToMark/types';

import PROFILE_UPDATE_PERCENTS_TO_MARK_CONVERTER_MUTATION from '../mutations/updatePercentsToMarkConverter';

import PercentsToMark from './percentToMark';
import { PercentsToMarkIndexProps } from './types';

const PercentsToMarkIndex: React.FC<PercentsToMarkIndexProps> = props => {
  const [
    updatePercentToMarkConvert,
    { loading: updatePercentToMarkConvertLoading },
  ] = useMutation<
    ProfileUpdatePercentsToMarkConverterMutation,
    ProfileUpdatePercentsToMarkConverterMutationVariables
  >(PROFILE_UPDATE_PERCENTS_TO_MARK_CONVERTER_MUTATION);

  const { t } = useTranslation(namespaces.pages.profile.index);
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = (percents: PercentsValues): void => {
    updatePercentToMarkConvert({
      variables: {
        input: {
          id: `${props.percents?.id}`,
          one: +percents.one,
          two: +percents.two,
          three: +percents.three,
          four: +percents.four,
        },
      },
    }).then(() =>
      enqueueSnackbar(t('snackbars.updatePercentToMarkConvert'), {
        variant: 'success',
      }),
    );
  };

  return (
    <PercentsToMark
      defaultPercents={{
        one: `${props.percents?.one || ''}`,
        two: `${props.percents?.two || ''}`,
        three: `${props.percents?.three || ''}`,
        four: `${props.percents?.four || ''}`,
      }}
      loading={updatePercentToMarkConvertLoading}
      onSubmit={submitHandler}
    />
  );
};

export default PercentsToMarkIndex;
