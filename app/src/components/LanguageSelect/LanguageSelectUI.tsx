import React, { useState } from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';

import languages from 'lib/i18n/lanugages';

import { LanguageSelectUIProps } from 'components/LanguageSelect/types';

const LanguageSelectUI = ({
  selectedLanguage,
  onLanguageChange,
  ...buttonProps
}: LanguageSelectUIProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = (): void => {
    setAnchorEl(null);
  };

  const mappedMenuItems = Object.keys(languages).map(lang => (
    <MenuItem
      key={lang}
      onClick={() => {
        onLanguageChange(lang);
      }}
      selected={selectedLanguage === lang}
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
        {...buttonProps}
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

export default LanguageSelectUI;
