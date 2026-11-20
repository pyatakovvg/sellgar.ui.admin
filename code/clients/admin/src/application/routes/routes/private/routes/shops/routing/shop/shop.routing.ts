import { Router } from '@sellgar/app/react';

import { shopModifyRoute } from './routes/modify';
import { shopCreateRoute } from './routes/create';
import { shopReviewRoute } from './routes/review';

export const shopRouting = new Router({
  routes: [shopModifyRoute, shopCreateRoute, shopReviewRoute],
});
