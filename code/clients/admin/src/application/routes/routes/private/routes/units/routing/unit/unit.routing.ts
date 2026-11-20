import { Router } from '@sellgar/app/react';

import { unitModifyRoute } from './routes/modify';
import { unitCreateRoute } from './routes/create';
import { unitReviewRoute } from './routes/review';

export const unitRouting = new Router({
  routes: [unitModifyRoute, unitCreateRoute, unitReviewRoute],
});
