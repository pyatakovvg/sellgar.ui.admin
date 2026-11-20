import { Route } from '@sellgar/app/react';

import { AnonymousLayout } from '@layout/anonymous';

import { signInRoute } from './routes/sign-in';

export const publicRoute = new Route({
  layouts: [AnonymousLayout],
  routes: [signInRoute],
});
