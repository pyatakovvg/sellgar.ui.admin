import { Router } from '@sellgar/app/react';

import { cartReviewRoute } from './routes/review';

export const cartRouting = new Router({
  routes: [cartReviewRoute],
});
