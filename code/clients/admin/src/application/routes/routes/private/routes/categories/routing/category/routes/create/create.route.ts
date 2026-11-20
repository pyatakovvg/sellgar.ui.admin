import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const categoryCreateRoute = new Route({
  token: Tokens.CategoryCreateRoute,
  address: segments('category', 'new', param('shopUuid')),
  load: () => import('@frame/category-modify'),
});
