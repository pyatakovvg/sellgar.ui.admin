export { Module, type IController } from './common/module';

export { useController } from './common/lazy-loader';
export { Route, useLoaderData, useLoaderRevalidate } from './common/route';

export { Router, useNavigate } from './common/router';
export { PublicRoutes } from './common/public-routes';
export { PrivateRoutes } from './common/private-routes';

export { Application, Await, useAwaitLoaderData, useRequest, useLoadContainerModule } from './common/application';

export { ApplicationControllerInterface } from './common/application/classes/controller/application-controller.interface.ts';

export { Breadcrumbs } from './components/breadcrumbs';
