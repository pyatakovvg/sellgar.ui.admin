import { ProfileEntity } from '@library/domain';

import React from 'react';

import { context } from '../application.context.ts';

interface IApplicationHook {
  isInitialized: boolean;
  profile: ProfileEntity;
  loadProfile(): Promise<void>;
  checkRoles(roles: string[]): boolean;
  checkPermissions(permissions: string[]): boolean;
  setInitialized(): void;
}

export const useApp = (): IApplicationHook => {
  const { presenter } = React.useContext(context);

  return {
    profile: React.useMemo(() => presenter.profile, [presenter.profile]),
    isInitialized: React.useMemo(() => presenter.initialized, [presenter.initialized]),
    loadProfile: React.useCallback(() => presenter.loadProfile(), [presenter]),
    setInitialized: React.useCallback(() => presenter.setApplicationInitialized(), [presenter]),
    checkRoles: React.useCallback((roles) => presenter.checkRoles(roles), [presenter.profile]),
    checkPermissions: React.useCallback((permissions) => presenter.checkPermissions(permissions), [presenter.profile]),
  };
};
