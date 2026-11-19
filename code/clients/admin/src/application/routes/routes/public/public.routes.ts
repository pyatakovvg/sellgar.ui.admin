import * as Tokens from '@library/route-tokens';
import { segments } from '@sellgar/app';
import { Route, Router } from '@sellgar/app/react';

import { AnonymousLayout } from '@layout/anonymous';

import { RequireAnonymousSessionPolicy } from '../../../policies';

export const PublicRoutes = (): Route[] => {
  return [
    new Route({
      layouts: [AnonymousLayout],
      routes: [
        new Route({
          token: Tokens.SignInRoute,
          address: segments('sign-in'),
          canMatch: [RequireAnonymousSessionPolicy.configure().onFail(Router.redirectToSaved({ replace: true }))],
          load: () => import('@module/sign-in'),
        }),
      ],
    }),
  ];
};
