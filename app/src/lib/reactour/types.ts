import { TFunction } from 'next-i18next';
import { ReactourStep } from 'reactour';

export interface ReactourContextProps {
  start: (props: {
    steps: (t: TFunction) => ReactourStep[];
    defaultNamespace?: string;
  }) => void;
  close: () => void;
}
