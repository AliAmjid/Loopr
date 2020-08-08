const translations = jest.genMockFromModule('lib/i18n');
const useTranslation = () => ({ t: () => '', i18n: {}, ready: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
translations.useTranslation = useTranslation;
module.exports = translations;
