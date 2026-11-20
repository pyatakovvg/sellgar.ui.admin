import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route, Router } from '@sellgar/app/react';

import { RequireAnonymousSessionPolicy } from '../../../../../policies';

export const signInRoute = new Route({
  token: Tokens.SignInRoute,
  address: segments('sign-in'),
  canMatch: [RequireAnonymousSessionPolicy.configure().onFail(Router.redirectToSaved({ replace: true }))],
  load: () => import('@module/sign-in'),
});
