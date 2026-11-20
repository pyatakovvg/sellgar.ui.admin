import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { templateCreateRoute } from './routes/create';
import { templateModifyRoute } from './routes/modify';

export const templatesRoute = new Route({
  token: Tokens.TemplatesRoute,
  address: segments('templates'),
  load: () => import('@module/templates'),
  routes: [templateCreateRoute, templateModifyRoute],
});
