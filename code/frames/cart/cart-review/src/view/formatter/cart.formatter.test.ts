import { describe, expect, it } from 'vitest';

import { formatMoney } from './cart.formatter.ts';

describe('cart money presentation', () => {
  it('preserves exact decimal strings beyond Number precision', () => {
    expect(formatMoney('123456789012345678.99', 'RUB')).toBe(
      '123\u202f456\u202f789\u202f012\u202f345\u202f678,99\u00a0RUB',
    );
  });

  it('distinguishes zero from an unavailable amount', () => {
    expect(formatMoney('0.00', 'RUB')).toBe('0,00\u00a0RUB');
    expect(formatMoney(null, 'RUB')).toBe('Не рассчитана');
  });

  it('uses the currency of the supplied price', () => {
    expect(formatMoney('1500.50', 'EUR')).toBe('1\u202f500,50\u00a0EUR');
  });
});
