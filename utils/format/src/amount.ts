interface INumberFormatOptions {
  hundredthsAfterDecimal?: boolean;
  locale?: string;
}

export const amountFormat = (amount: number | string, options?: INumberFormatOptions) => {
  const locale = options?.locale || 'ru-RU';
  const numericAmount = typeof amount === 'string' ? Number(amount) : amount;

  if (options?.hundredthsAfterDecimal) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(numericAmount);
  }

  const hasFraction = numericAmount % 1 !== 0;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(numericAmount);
};
