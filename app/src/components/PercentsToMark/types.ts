export interface PercentsValues {
  one: string;
  two: string;
  three: string;
  four: string;
}

export interface PercentsErrors {
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
}

export interface PercentsToMarkProps {
  percents: PercentsValues;
  onPercentsChange: (values: {
    percents: PercentsValues;
    errors: PercentsErrors;
  }) => void;
}
