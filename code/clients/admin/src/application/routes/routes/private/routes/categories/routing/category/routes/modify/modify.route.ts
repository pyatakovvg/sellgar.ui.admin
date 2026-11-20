import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const categoryModifyRoute = new Route({
  token: Tokens.CategoryModifyRoute,
  address: segments('category', param('uuid')),
  load: () => import('@frame/category-modify'),
});
