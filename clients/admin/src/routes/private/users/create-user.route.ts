import { Route } from '@library/app';

export const createUserRoute = new Route('/create', () => import('@admin/user'), {
  breadcrumb: {
    label: 'Создание',
  },
});
