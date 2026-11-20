import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';
import { variantRouting } from '../../routing/variant';

export const productReviewRoute = new Route({
  token: Tokens.ProductReviewRoute,
  address: segments(param('uuid')),
  load: () => import('@module/product-review'),
  routing: [variantRouting],
});
