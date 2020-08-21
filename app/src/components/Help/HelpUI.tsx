import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { HelpUIProps } from 'components/Help/types';

const HelpUI = (props: HelpUIProps): JSX.Element => {
  const { t } = useTranslation(namespaces.components.Help);

  return (
    <Tooltip title={t<string>('documentation')}>
      <IconButton {...props} test-id="HelpUI-button">
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default HelpUI;
