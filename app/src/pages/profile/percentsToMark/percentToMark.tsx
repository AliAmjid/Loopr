import React, { useState } from 'react';

import { Box, Button, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n/';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import PercentsToMarkComponent from 'components/PercentsToMark';
import {
  PercentsErrors,
  PercentsValues,
} from 'components/PercentsToMark/types';

import { PercentsToMarkProps } from './types';

const PercentsToMark: React.FC<PercentsToMarkProps> = props => {
  const defaultState = {
    percents: {
      one: props.defaultPercents.one,
      two: props.defaultPercents.two,
      three: props.defaultPercents.three,
      four: props.defaultPercents.four,
    },
    errors: {
      one: false,
      two: false,
      three: false,
      four: false,
    },
  };

  const [percents, setPercents] = useState<{
    percents: PercentsValues;
    errors: PercentsErrors;
  }>(defaultState);

  const { t } = useTranslation(namespaces.pages.profile.index);

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <Box pl={2} pt={2}>
        <Typography>{t('percentToMarkDetail')}</Typography>
        <Box pt={2} pb={2}>
          <PercentsToMarkComponent
            percents={percents.percents}
            onPercentsChange={setPercents}
          />
        </Box>
        <Box display="flex">
          <Button color="primary" onClick={() => setPercents(defaultState)}>
            {t('common:actions.reset')}
          </Button>
          <Box pl={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                props.onSubmit(percents.percents);
              }}
            >
              {t('common:actions.save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </OverlayLoadingContainer>
  );
};

export default PercentsToMark;
