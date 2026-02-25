import React from 'react';
import { ContainerModule } from 'inversify';

import { RouterInterface } from '../router';
import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export type GuardHook = 'router' | 'private' | 'public';
export type GuardRunStage = 'init' | 'navigation' | 'navigate';

export abstract class GuardInterface {
  runOn?: Partial<Record<GuardHook, GuardRunStage>>;
  beforeRouter?(app: ApplicationControllerInterface): Promise<void>;
  beforePrivate?(app: ApplicationControllerInterface): Promise<void>;
  beforePublic?(app: ApplicationControllerInterface): Promise<void>;
}

export interface IComponents {
  splash: React.ReactNode;
  fallback?: React.ReactNode;
  exception: React.ReactNode;
  notFound: React.ReactNode;
  forbidden: React.ReactNode;
}

export interface IOptions {
  containers?: ContainerModule[];
  layout?(outlet: React.ReactNode): React.ReactNode;
  components?: Partial<IComponents>;
  router: RouterInterface;
}

export abstract class ApplicationInterface {
  abstract guard(guard: new (...args: any[]) => GuardInterface): void;
  abstract createView(): React.FC;
}
