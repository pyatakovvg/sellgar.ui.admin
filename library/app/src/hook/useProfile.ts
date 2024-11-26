import { ProfileEntity } from '@library/domain';

import React from 'react';

import { useApp } from './useApp';

interface IUseProfileHook {
  data: ProfileEntity;
  roles: string[];
  permissions: string[];
  checkRoles(roles: string[]): boolean;
  checkPermissions(permissions: string[]): boolean;
}

export const useProfile = (): IUseProfileHook => {
  const app = useApp();

  const checkRoles = React.useCallback((roles: string[]): boolean => app.checkRoles(roles), [app.profile]);

  const checkPermissions = React.useCallback(
    (permissions: string[]): boolean => app.checkPermissions(permissions),
    [app.profile],
  );

  return {
    data: app.profile,
    roles: [],
    permissions: [],
    checkRoles,
    checkPermissions,
  };
};
