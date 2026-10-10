import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route, Router } from '@sellgar/app/react';

import { BaseLayout } from '@layout/base';

import { RequireAnonymousSessionPolicy } from '../../../policies';

export const PublicRoutes = (): Route[] => {
  return [
    new Route({
      layouts: [BaseLayout],
      routes: [
        new Route({
          token: Tokens.SignInRoute,
          address: segments('sign-in'),
          canMatch: [RequireAnonymousSessionPolicy.configure().onFail(Router.redirectToSaved({ replace: true }))],
          load: () => import('@page/sign-in'),
        }),
      ],
    }),
  ];
};
