import { PercentsValues } from 'components/PercentsToMark/types';

export interface PercentsToMarkIndexProps {
  percents?: {
    id: string;
    one: number;
    two: number;
    three: number;
    four: number;
  } | null;
}

export interface PercentsToMarkProps {
  defaultPercents: PercentsValues;
  loading: boolean;
  onSubmit: (percents: PercentsValues) => void;
}
