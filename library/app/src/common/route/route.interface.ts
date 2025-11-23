import React from 'react';
import * as ReactRouter from 'react-router-dom';

type TBreadcrumb = string | Function;

interface IOptionsWithModule {
  path?: string;
  breadcrumb?: TBreadcrumb;
  module: () => Promise<any>;
}

interface IOptionsWithRoutes {
  path: string;
  breadcrumb?: TBreadcrumb;
  layout?(outlet: React.ReactNode): React.ReactNode;
  routes: RouteInterface[];
}

export type IOptions = IOptionsWithModule | IOptionsWithRoutes;

export abstract class RouteInterface {
  abstract create(): ReactRouter.RouteObject;
}
