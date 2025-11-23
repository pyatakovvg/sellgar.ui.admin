import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { RouteInterface } from '../route';

export interface IOptions {
  preloadProfile?: boolean;
  routes: RouteInterface[];
  layout?(outlet: React.ReactNode): React.ReactNode;
}

export abstract class PrivateRoutesInterface {
  abstract create(): ReactRouter.RouteObject;
}
