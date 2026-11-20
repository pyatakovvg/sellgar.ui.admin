import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const variantCreateRoute = new Route({
  token: Tokens.ProductVariantCreateRoute,
  address: segments('variant', param('productUuid'), 'new'),
  load: () => import('@frame/product-variant-modify'),
});
