import React from 'react';
import { ContainerModule } from 'inversify';

import { RouterInterface } from '../router';
import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export abstract class GuardInterface {
  beforeRouter?(app: ApplicationControllerInterface): Promise<void>;
  beforePrivate?(app: ApplicationControllerInterface): Promise<void>;
  beforePublic?(app: ApplicationControllerInterface): Promise<void>;
}

export interface IComponents {
  splash: React.ReactNode;
  loading: React.ReactNode;
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
