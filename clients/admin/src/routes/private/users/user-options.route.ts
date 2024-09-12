import { Route } from '@library/app';

export const userOptionsRoute = new Route('/options', () => import('@admin/user-options'), {
  breadcrumb: {
    label: 'Настройки',
  },
});
