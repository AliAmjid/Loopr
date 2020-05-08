import { ReactourStep } from 'reactour';

import tourId from 'lib/reactour/tourId';

const loginSteps: ReactourStep[] = [
  {
    selector: tourId('loginForm'),
    content: 'Toto je login form',
  },
  {
    selector: tourId('button'),
    content: 'To je buttón',
  },
  {
    selector: tourId('button1'),
    content: 'To je také buttón',
  },
  { content: 'A tady neni nic' },
];

export default loginSteps;
