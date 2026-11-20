import { Router } from '@sellgar/app/react';

import { storeModifyRoute } from './routes/modify';
import { storeCreateRoute } from './routes/create';
import { storeReviewRoute } from './routes/review';

export const storeRouting = new Router({
  routes: [storeModifyRoute, storeCreateRoute, storeReviewRoute],
});
