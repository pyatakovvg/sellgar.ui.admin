import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route } from '@sellgar/app/react';

import { propertyRouting } from './routing/property';

export const propertiesRoute = new Route({
  token: Tokens.PropertiesRoute,
  address: segments('properties'),
  load: () => import('@module/properties'),
  routing: [propertyRouting],
});
