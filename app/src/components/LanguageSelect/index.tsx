import React from 'react';

import { useTranslation } from 'lib/i18n';

import LanguageSelectUI from 'components/LanguageSelect/LanguageSelectUI';
import { LanguageSelectProps } from 'components/LanguageSelect/types';

const LanguageSelect = (props: LanguageSelectProps): JSX.Element => {
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
