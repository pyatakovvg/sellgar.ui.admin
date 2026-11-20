import { Router } from '@sellgar/app/react';

import { brandModifyRoute } from './routes/modify';
import { brandCreateRoute } from './routes/create';
import { brandReviewRoute } from './routes/review';

export const brandRouting = new Router({
  routes: [brandModifyRoute, brandCreateRoute, brandReviewRoute],
});
