import { Route } from '@library/app';

export const updateUserRoute = new Route('/:uuid', () => import('@admin/user'), {
  breadcrumb: {
    label: 'Редактирование',
  },
});
