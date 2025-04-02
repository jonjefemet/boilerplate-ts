const formatDecimal = (number: number) => {
  const result = Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
  }).formatToParts(number);

  const fraction = result.find((x) => x.type == 'fraction');

  return fraction
    ? +(Math.floor(number) + '.' + fraction.value.substring(0, 2))
    : Math.floor(number);
};

const calculatePercentageAmount = (
  value: number,
  percentage: number,
): number => {
  return value * (percentage / 100);
};

const isPositiveNumber = (value: number): boolean => value > 0;

export { formatDecimal, calculatePercentageAmount, isPositiveNumber };
