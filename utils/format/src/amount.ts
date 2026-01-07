interface INumberFormatOptions {
  hundredthsAfterDecimal?: boolean;
  locale?: string;
}

export const amountFormat = (amount: number, options?: INumberFormatOptions) => {
  const locale = options?.locale || 'ru-RU';

  if (options?.hundredthsAfterDecimal) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(amount);
  }

  const hasFraction = amount % 1 !== 0;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(amount);
};
