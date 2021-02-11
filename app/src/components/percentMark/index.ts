export const getPercents = (values: { max: number; value: number }): number => {
  return Math.round(values.value / (values.max / 100));
};

export const getPoints = (values: {
  max: number;
  percents: number;
}): number => {
  return Math.round(values.max * (values.percents / 100));
};

export const getMark = ({
  percents,
  percentsToMarkConvert,
}: {
  percents: number;
  percentsToMarkConvert: {
    one: number;
    two: number;
    three: number;
    four: number;
  };
}): number => {
  if (percents >= percentsToMarkConvert.one) return 1;
  if (percents >= percentsToMarkConvert.two) return 2;
  if (percents >= percentsToMarkConvert.three) return 3;
  if (percents >= percentsToMarkConvert.four) return 4;

  return 5;
};

export const getMarkColor = (mark: number): string => {
  const colors: Record<number, string> = {
    1: '#08C62E',
    2: '#7DFE3E',
    3: '#FFF600',
    4: '#FF6F00',
    5: '#FF0F0F',
  };

  return colors[mark] || '';
};
