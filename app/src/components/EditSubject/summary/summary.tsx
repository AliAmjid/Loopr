import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import { SummaryProps } from './types';

const Summary: React.FC<SummaryProps> = props => {
  const { t } = useTranslation(namespaces.components.EditSubject);

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <Typography variant="h3">
        {props.classGroup ? t('classGroup') : t('group')}
      </Typography>
      <Typography>
        {`${props.group?.year || ''} ${props.group?.section}`}
      </Typography>
      <Typography variant="h3">{t('teacher')}</Typography>
      <Typography>
        {`${props.teacher?.firstname || ''} ${props.teacher?.lastname}`}
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Box pr={2}>
          <Link href={routes.subjects.index} passHref>
            <Button color="primary">{t('common:actions.cancel')}</Button>
          </Link>
        </Box>
        <Button color="primary" variant="contained" onClick={props.onSubmit}>
          {props.submitButtonLabel}
        </Button>
      </Box>
    </OverlayLoadingContainer>
  );
};

export default Summary;
