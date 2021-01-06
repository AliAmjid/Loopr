export const getPercents = (values: { max: number; value: number }): number => {
  return values.value / (values.max / 100);
};

export const getPoints = (values: {
  max: number;
  percents: number;
}): number => {
  return values.max * (values.percents / 100);
};
