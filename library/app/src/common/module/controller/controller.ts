import { ServiceIdentifier } from 'inversify';

import { contextProvider } from '../../context';
import { ApplicationContext } from '../../application';

import { ControllerInterface, type IController } from './controller.interface.ts';

export class Controller<T = IController> implements ControllerInterface<T> {
  private controllers: Map<ServiceIdentifier<T>, T> = new Map();

  remove(controller: ServiceIdentifier<T>) {
    this.controllers.delete(controller);
  }

  set(controller: ServiceIdentifier<T>) {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

    if (this.controllers.has(controller)) {
      throw new Error(`Controller ${controller.toString()} already exists`);
    }

    this.controllers.set(controller, applicationContext.container.getContainer().get(controller));
  }

  get(controller: ServiceIdentifier<T>): T {
    if (!this.controllers.has(controller)) {
      throw new Error(`Controller ${controller.toString()} not found`);
    }
    return this.controllers.get(controller)!;
  }
}
