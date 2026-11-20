import { Router } from '@sellgar/app/react';

import { privateRoute } from './routes/private';
import { publicRoute } from './routes/public';

export const createAdminRouter = (): Router => {
  return new Router({
    routes: [privateRoute, publicRoute],
  });
};
