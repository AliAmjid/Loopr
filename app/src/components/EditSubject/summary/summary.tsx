import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import Link from 'next/link';

import routes from 'config/routes';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import ThickDivider from 'components/thickDivider';

import { SummaryProps } from './types';

const Summary: React.FC<SummaryProps> = props => {
  const { t } = useTranslation(namespaces.components.EditSubject);

  return (
    <OverlayLoadingContainer>
      <OverlayLoading loading={props.loading} />
      <Typography variant="h3">
        {props.classGroup ? t('classGroup') : t('group')}
      </Typography>
      <ThickDivider />
      <Box pt={2} pb={4} pl={2}>
        <Typography variant="h6">
          {`${props.group?.year || ''} ${props.group?.section}`}
        </Typography>
      </Box>
      <Typography variant="h3">{t('teacher')}</Typography>
      <ThickDivider />
      <Box pt={2} pl={2} pb={2}>
        <Typography variant="h6">
          {`${props.teacher?.firstname || ''} ${props.teacher?.lastname}`}
        </Typography>
      </Box>
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
