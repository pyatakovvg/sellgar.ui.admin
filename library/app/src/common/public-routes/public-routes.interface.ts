import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { RouteInterface } from '../route';

export interface IOptions {
  routes: RouteInterface[];
  layout?(outlet: React.ReactNode): React.ReactNode;
}

export abstract class PublicRoutesInterface {
  abstract create(): ReactRouter.RouteObject;
}
