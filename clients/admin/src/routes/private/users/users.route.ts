import { Route } from '@library/app';

export const usersRoute = new Route('/', () => import('@admin/users'));
