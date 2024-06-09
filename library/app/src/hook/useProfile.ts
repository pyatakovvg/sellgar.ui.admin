import React from 'react';

import { useApp } from './useApp';

export const useProfile = () => {
  const app = useApp();

  const checkRoles = React.useCallback(
    (roles: string[]): boolean => app.presenter.checkRoles(roles),
    [app.presenter.profile],
  );

  const checkPermissions = React.useCallback(
    (permissions: string[]): boolean => app.presenter.checkPermissions(permissions),
    [app.presenter.profile],
  );

  return {
    person: app.presenter.profile.person,
    roles: app.presenter.profile.roles,
    checkRoles,
    checkPermissions,
  };
};
