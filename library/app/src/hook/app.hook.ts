import { container } from '@library/domain';

import { ProfileEntity } from '@library/domain';

import React from 'react';
import { Container } from 'inversify';

import { context } from '../application.context.ts';

interface IApplicationHook {
  container: Container;

  isInitialized: boolean;
  setInitialized(): void;

  profile: ProfileEntity;
  loadProfile(): Promise<void>;

  checkRoles(roles: string[]): boolean;
  checkPermissions(permissions: string[]): boolean;
}

export const useApp = (): IApplicationHook => {
  const { controller } = React.useContext(context);

  return {
    container,

    profile: React.useMemo(() => controller.profileStore.profile, [controller]),
    loadProfile: React.useCallback(() => controller.loadProfile(), [controller]),

    isInitialized: React.useMemo(() => controller.applicationStore.initialized, [controller]),
    setInitialized: React.useCallback(() => controller.applicationStore.setInitialize, [controller]),

    checkRoles: React.useCallback((roles) => controller.profileStore.checkRoles(roles), [controller]),
    checkPermissions: React.useCallback(
      (permissions) => controller.profileStore.checkPermissions(permissions),
      [controller],
    ),
  };
};
