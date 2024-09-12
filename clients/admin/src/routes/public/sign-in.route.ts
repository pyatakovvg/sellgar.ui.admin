import { Route } from '@library/app';

export const signInRoute = new Route('/sign-in', () => import('@admin/sign-in'));
