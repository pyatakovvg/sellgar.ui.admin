import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { categoryRouting } from './routing/category';

export const categoriesRoute = new Route({
  token: Tokens.CategoriesRoute,
  address: segments('categories'),
  load: () => import('@module/categories'),
  routing: [categoryRouting],
});
