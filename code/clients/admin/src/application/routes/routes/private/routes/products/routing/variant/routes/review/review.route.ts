import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const variantReviewRoute = new Route({
  token: Tokens.ProductVariantReviewRoute,
  address: segments('variant', param('productUuid'), param('variantUuid')),
  load: () => import('@frame/product-variant-review'),
});
