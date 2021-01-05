const countPercents = (values: { max: number; value: number }): number => {
  return values.value / (values.max / 100);
};

export default countPercents;
