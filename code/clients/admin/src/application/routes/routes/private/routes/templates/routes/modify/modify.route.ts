import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const templateModifyRoute = new Route({
  token: Tokens.TemplateModifyRoute,
  address: segments(param('uuid')),
  load: () => import('@module/template-modify'),
});
