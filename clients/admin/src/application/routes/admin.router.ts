import { Router } from '@sellgar/app/react';

import { PublicRoutes } from './routes/public/public.routes.ts';
import { PrivateRoutes } from './routes/private/private.routes.ts';

export const createAdminRouter = (): Router => {
  return new Router({
    routes: [...PrivateRoutes(), ...PublicRoutes()],
  });
};
