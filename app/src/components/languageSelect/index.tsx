import React, { useState } from 'react';

import { IconButton, IconButtonProps, Menu, MenuItem } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';

import { useTranslation } from 'lib/i18n';
import languages from 'lib/i18n/lanugages';

const LanguageSelect = (props: IconButtonProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation('login');

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = (): void => {
    setAnchorEl(null);
  };

  const changeHandler = (lang: string): void => {
    i18n.changeLanguage(lang);
  };

  const mappedMenuItems = Object.keys(languages).map(lang => (
    <MenuItem
      key={lang}
      onClick={() => {
        changeHandler(lang);
        closeHandler();
      }}
      selected={i18n.language === lang}
    >
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        languages[lang]
      }
    </MenuItem>
  ));

  return (
    <>
      <IconButton
        {...props}
        aria-controls="languageSelectMenu"
        aria-haspopup="true"
        onClick={clickHandler}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="languageSelectMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeHandler}
      >
        {mappedMenuItems}
      </Menu>
    </>
  );
};

export default LanguageSelect;
