const NextI18Next = require('next-i18next').default;
const path = require('path');
const namespaces = require('./namespaces');
const localeSubpaths = require('./localeSubpaths');

const languages = {
  cs: 'Čeština',
  en: 'English',
};
const defaultLanguage = 'cs';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage,
  otherLanguages: Object.keys(languages),
  localePath: path.resolve('./public/static/locales'),
  localeSubpaths,
});

module.exports = {
  ...NextI18NextInstance,
  defaultLanguage,
  languages,
  namespaces,
};
