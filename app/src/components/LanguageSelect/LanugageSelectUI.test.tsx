import React from 'react';

import { mount } from 'enzyme';

import { defaultLanguage, languages } from 'lib/i18n';
import children from 'lib/jest/helpers/children';
import testId from 'lib/jest/helpers/testId';

import LanguageSelectUI from 'components/LanguageSelect/LanguageSelectUI';

describe('LanguageSelectUI', () => {
  it('Should fire callback on language change', () => {
    const languageChangeHandler = jest.fn(() => {});
    const wrapper = mount(
      <LanguageSelectUI
        selectedLanguage={defaultLanguage}
        onLanguageChange={languageChangeHandler}
      />,
    );

    const changeLanguage = Object.keys(languages).find(
      l => l !== defaultLanguage,
    );

    wrapper
      .find(testId('LanguageSelectUI-languageButton'))
      .at(0)
      .simulate('click');
    wrapper
      .find(
        `${testId('LanguageSelectUI-menuItem')}${children(
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          languages[changeLanguage],
        )}`,
      )
      .at(0)
      .simulate('click');
    expect(languageChangeHandler).toBeCalledTimes(1);
    expect(languageChangeHandler).toBeCalledWith(changeLanguage);
  });
});
