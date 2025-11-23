import * as ReactRouter from 'react-router-dom';
import * as inversify from 'inversify';

export interface IController {
  loader?(args: ReactRouter.LoaderFunctionArgs): unknown | Promise<unknown>;
  destructor?(args: ReactRouter.LoaderFunctionArgs): void | Promise<void>;
}

export abstract class ControllerInterface<T> {
  abstract set(controller: inversify.ServiceIdentifier<T>): void;
  abstract get(controller: inversify.ServiceIdentifier<T>): T;
  abstract remove(controller: inversify.ServiceIdentifier<T>): void;
}
