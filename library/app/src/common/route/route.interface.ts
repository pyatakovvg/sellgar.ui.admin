import React from 'react';
import * as ReactRouter from 'react-router-dom';

type TBreadcrumb = string | Function;

export interface IOptionsWithModule {
  path?: string;
  breadcrumb?: TBreadcrumb;
  fallback?: React.ReactNode;
  module: () => Promise<any>;
}

export interface IOptionsWithRoutes {
  breadcrumb?: TBreadcrumb;
  layout?(outlet: React.ReactNode): React.ReactNode;
  path: string;
  routes: RouteInterface[];
}

export type IOptions = IOptionsWithModule | IOptionsWithRoutes;

export abstract class RouteInterface {
  abstract create(): ReactRouter.RouteObject;
}
