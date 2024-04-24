import React from 'react';

import { useApp } from './useApp';

export const useProfile = () => {
  const app = useApp();

  const checkRoles = React.useCallback((roles: string[]): boolean => app.profile.checkRoles(roles), [app.profile]);

  const checkPermissions = React.useCallback(
    (permissions: string[]): boolean => app.profile.checkPermissions(permissions),
    [app.profile],
  );

  return {
    person: app.profile.profile.person,
    roles: app.profile.profile.roles,
    checkRoles,
    checkPermissions,
  };
};
