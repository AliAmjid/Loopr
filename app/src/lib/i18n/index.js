const NextI18Next = require('next-i18next').default;

const languages = {
  cs: 'Čeština',
  en: 'English',
};
const defaultLanguage = 'cs';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage,
  otherLanguages: Object.keys(languages),
});

module.exports = { ...NextI18NextInstance, defaultLanguage, languages };
