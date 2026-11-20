import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const variantModifyRoute = new Route({
  token: Tokens.ProductVariantModifyRoute,
  address: segments('variant', param('productUuid'), param('variantUuid'), 'edit'),
  load: () => import('@frame/product-variant-modify'),
});
