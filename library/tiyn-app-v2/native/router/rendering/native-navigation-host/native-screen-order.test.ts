import { describe, expect, it } from 'vitest';

import { resolveNativeScreenOrder } from './native-screen-order.ts';

describe('resolveNativeScreenOrder', () => {
  it('keeps the most recently focused retained screen directly below the target', () => {
    let order = resolveNativeScreenOrder([], ['products'], 'products');

    order = resolveNativeScreenOrder(order, ['products', 'brands'], 'brands');
    order = resolveNativeScreenOrder(order, ['products', 'brands'], 'products');
    order = resolveNativeScreenOrder(order, ['products', 'brands', 'product'], 'product');

    expect(order).toEqual(['brands', 'products', 'product']);
  });

  it('removes released screens and promotes the Back target', () => {
    const order = resolveNativeScreenOrder(['brands', 'products', 'product'], ['products', 'brands'], 'products');

    expect(order).toEqual(['brands', 'products']);
  });
});
