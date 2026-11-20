import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { productCreateRoute } from './routes/create';
import { productReviewRoute } from './routes/review';
import { productModifyRoute } from './routes/modify';

export const productsRoute = new Route({
  token: Tokens.ProductsRoute,
  address: segments('products'),
  load: () => import('@module/products'),
  routes: [productCreateRoute, productModifyRoute, productReviewRoute],
});
