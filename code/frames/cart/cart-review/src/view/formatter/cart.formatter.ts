export const formatMoney = (value: string | null, currencyCode: string): string => {
  if (value === null) return 'Не рассчитана';

  const [integer, fraction] = value.split('.');

  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f')},${fraction}\u00a0${currencyCode}`;
};
