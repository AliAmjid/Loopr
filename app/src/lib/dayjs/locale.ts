import dayjs from 'dayjs';

const dayjsLocale = {
  name: 'cs',
  weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
  months: 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split(
    '_',
  ),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm',
  },
  relativeTime: {
    s: 'několik sekund',
    m: 'minuta',
    mm: '%d minuta',
    h: 'hodina',
    hh: '%d hodina',
    d: 'den',
    dd: '%d den',
    M: 'měsíc',
    MM: '%d měsíc',
    y: 'rok',
    yy: '%d rok',
    future: 'za',
    past: 'před',
  },
};

dayjs.locale('cs', dayjsLocale, true);

export default dayjsLocale;
