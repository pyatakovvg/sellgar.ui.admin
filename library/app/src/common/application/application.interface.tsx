import React from 'react';

import { RouterInterface } from '../router';
import { ContainerInterface } from '../container';

export interface IComponents {
  splash: React.ReactNode;
  loading: React.ReactNode;
  exception: React.ReactNode;
  notFound: React.ReactNode;
  forbidden: React.ReactNode;
}

export interface IOptions {
  layout?(outlet: React.ReactNode): React.ReactNode;
  components?: Partial<IComponents>;
  router: RouterInterface;
}

export abstract class ApplicationInterface {
  abstract container: ContainerInterface;

  abstract createView(): React.FC;
}
