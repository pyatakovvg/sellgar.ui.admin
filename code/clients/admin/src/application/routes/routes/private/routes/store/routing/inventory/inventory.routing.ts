import { Router } from '@sellgar/app/react';

import { storeInventoryRoute } from './routes/inventory';

export const storeInventoryRouting = new Router({
  routes: [storeInventoryRoute],
});
