import React from 'react';

import { useTranslation } from 'lib/i18n';

import LanguageSelectUI from 'components/LanguageSelect/LanguageSelectUI';

import { LanguageSelectProps } from './types';

const LanguageSelect: React.FC<LanguageSelectProps> = props => {
  const { i18n } = useTranslation();

  return (
    <LanguageSelectUI
      selectedLanguage={i18n.language}
      onLanguageChange={(lang: string) => i18n.changeLanguage(lang)}
      {...props}
    />
  );
};

export default LanguageSelect;
