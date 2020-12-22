import React from 'react';

import { defaultLanguage, useTranslation } from 'lib/i18n';

import HelpUI from 'components/Help/HelpUI';

import { HelpProps } from './types';

const Help: React.FC<HelpProps> = ({ path, ...props }) => {
  const { i18n } = useTranslation();
  const clickHandler = (): void => {
    window.open(
      `${process.env.NEXT_PUBLIC_DOCS_URL}/#/${
        i18n.language || defaultLanguage
      }/${path}`,
      '_blank',
    );
  };

  return <HelpUI {...props} onClick={clickHandler} />;
};

export default Help;
