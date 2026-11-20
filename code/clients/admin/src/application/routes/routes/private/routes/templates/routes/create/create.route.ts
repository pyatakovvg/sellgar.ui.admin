import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

export const templateCreateRoute = new Route({
  token: Tokens.TemplateCreateRoute,
  address: segments('create'),
  load: () => import('@module/template-modify'),
});
