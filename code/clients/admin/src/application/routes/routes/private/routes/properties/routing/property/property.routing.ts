import { Router } from '@sellgar/app/react';

import { propertyModifyRoute } from './routes/modify';
import { propertyCreateRoute } from './routes/create';
import { propertyReviewRoute } from './routes/review';

export const propertyRouting = new Router({
  routes: [propertyModifyRoute, propertyCreateRoute, propertyReviewRoute],
});
