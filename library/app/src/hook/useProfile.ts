import React from 'react';

import { useApp } from './useApp';

interface IProfile {}

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
    uuid: app.presenter.profile.uuid,
    login: app.presenter.profile.login,
    user: app.presenter.profile.user,
    roles: app.presenter.profile.roles,
    permissions: app.presenter.profile.permissions,
    checkRoles,
    checkPermissions,
  };
};
