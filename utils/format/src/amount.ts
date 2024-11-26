import numeral from 'numeral';

interface INumberFormatOptions {
  hundredthsAfterDecimal?: boolean;
}

export const amountFormat = (amount: number, options?: INumberFormatOptions) => {
  if (options?.hundredthsAfterDecimal) {
    return numeral(amount).format('0,0.00');
  }
  return numeral(amount).format('0,0[.]00');
};
