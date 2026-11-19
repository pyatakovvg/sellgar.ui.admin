import numeral from 'numeral';

numeral.register('locale', 'ru', {
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'тыс',
    million: 'млн',
    billion: 'м',
    trillion: 'тр',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'Р',
  },
});

numeral.locale('ru');

export { amountFormat } from './amount.ts';

export { dateFormat } from './date.ts';
export { timeFormat } from './time.ts';

export { phoneHiddenFormat } from './phone.ts';
