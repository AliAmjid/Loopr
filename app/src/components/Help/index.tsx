import React from 'react';

import config from 'config';

import { defaultLanguage, useTranslation } from 'lib/i18n';

import HelpUI from 'components/Help/HelpUI';

import { HelpProps } from './types';

const Help = ({ path, ...props }: HelpProps): JSX.Element => {
  const { i18n } = useTranslation();
  const clickHandler = (): void => {
    window.open(
      `${config.docsURL}/#/${i18n.language || defaultLanguage}/${path}`,
      '_blank',
    );
  };

  return <HelpUI {...props} onClick={clickHandler} />;
};

export default Help;
