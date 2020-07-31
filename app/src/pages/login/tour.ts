import { TFunction } from 'next-i18next';
import { ReactourStep } from 'reactour';

import tourId from 'lib/reactour/tourId';

const loginTour = (t: TFunction): ReactourStep[] => [
  {
    selector: tourId('loginForm'),
    content: `Toto je login form ${t('password')}`,
  },
  {
    selector: tourId('submitButton'),
    content: 'To je buttón',
  },
  {
    selector: tourId('languageButton'),
    content: 'To je také buttón',
  },
  { content: 'A tady neni nic' },
];

export default loginTour;
