const NextI18Next = require('next-i18next').default;
const path = require('path');

const languages = {
  cs: 'Čeština',
  en: 'English',
};
const defaultLanguage = 'cs';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage,
  otherLanguages: Object.keys(languages),
  localePath: path.resolve('./public/static/locales'),
  fallbackLng: defaultLanguage,
});

module.exports = {
  ...NextI18NextInstance,
  defaultLanguage,
  languages,
};
