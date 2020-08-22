import React, { useState } from 'react';

import {
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Tooltip,
} from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';

import { languages, useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { LanguageSelectUIProps } from './types';

const LanguageSelectUI = ({
  selectedLanguage,
  onLanguageChange,
  ...buttonProps
}: LanguageSelectUIProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation(namespaces.components.LanguageSelect);

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
      test-id="LanguageSelectUI-menuItem"
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
      <Tooltip title={t<string>('changeLanguage')}>
        <IconButton
          {...buttonProps}
          aria-controls="languageSelectMenu"
          aria-haspopup="true"
          onClick={clickHandler}
          test-id="LanguageSelectUI-languageButton"
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="languageSelectMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeHandler}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {mappedMenuItems}
      </Menu>
    </>
  );
};

export default LanguageSelectUI;
