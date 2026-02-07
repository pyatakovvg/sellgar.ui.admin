export { Module, type IController } from './common/module';

export { useController } from './common/lazy-loader';
export { Route, useLoaderData, useLoaderRevalidate } from './common/route';

export { Router, useNavigate, useLocation } from './common/router';
export { PublicRoutes } from './common/public-routes';
export { PrivateRoutes } from './common/private-routes';
export { createWidget, useWidgetController, useWidgetLoaderData } from './common/widget';

export {
  Application,
  Await,
  useAwaitLoaderData,
  useRequest,
  useLoadContainerModule,
  useContainer,
  GuardInterface,
  NavigateServiceInterface,
  RevalidateServiceInterface,
} from './common/application';

export { ApplicationControllerInterface } from './common/application/classes/controller/application-controller.interface.ts';

export { Breadcrumbs } from './components/breadcrumbs';

export type { LoaderArgs } from './common/lazy-loader';
