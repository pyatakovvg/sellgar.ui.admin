import { RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';

export class PublicRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      children: this.children.map((route) => route.create()),
    };
  }
}
