import { Router } from '@sellgar/app/react';

import { categoryCreateRoute } from './routes/create';
import { categoryModifyRoute } from './routes/modify';

export const categoryRouting = new Router({
  routes: [categoryCreateRoute, categoryModifyRoute],
});
