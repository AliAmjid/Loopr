import dayjs from 'dayjs';
import { TFunction } from 'next-i18next';

const getDayjsLocales = (lang: string, t: TFunction): string => {
  const object: Partial<ILocale> = { name: '', weekStart: 0 };
  if (lang === 'cs') {
    object.name = 'cs';
    object.weekStart = 1;
  } else if (lang === 'en') {
    object.name = 'en';
    object.weekStart = 0;
  }
  object.weekdays = [
    t('weekdays.1'),
    t('weekdays.2'),
    t('weekdays.3'),
    t('weekdays.4'),
    t('weekdays.5'),
    t('weekdays.6'),
    t('weekdays.7'),
  ];
  object.weekdaysShort = [
    t('weekdaysShort.1'),
    t('weekdaysShort.2'),
    t('weekdaysShort.3'),
    t('weekdaysShort.4'),
    t('weekdaysShort.5'),
    t('weekdaysShort.6'),
    t('weekdaysShort.7'),
  ];
  object.months = [
    t('months.1'),
    t('months.2'),
    t('months.3'),
    t('months.4'),
    t('months.5'),
    t('months.6'),
    t('months.7'),
    t('months.8'),
    t('months.9'),
    t('months.10'),
    t('months.11'),
    t('months.12'),
  ];
  object.monthsShort = [
    t('monthsShort.1'),
    t('monthsShort.2'),
    t('monthsShort.3'),
    t('monthsShort.4'),
    t('monthsShort.5'),
    t('monthsShort.6'),
    t('monthsShort.7'),
    t('monthsShort.8'),
    t('monthsShort.9'),
    t('monthsShort.10'),
    t('monthsShort.11'),
    t('monthsShort.12'),
  ];

  return dayjs.locale(lang, object, true);
};

export default getDayjsLocales;
