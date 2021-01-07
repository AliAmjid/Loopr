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
  console.log(percents, percentsToMarkConvert.one);
  if (percents >= percentsToMarkConvert.one) return 1;
  if (percents >= percentsToMarkConvert.two) return 2;
  if (percents >= percentsToMarkConvert.three) return 3;
  if (percents >= percentsToMarkConvert.four) return 4;

  return 5;
};
