import * as inversify from 'inversify/lib/esm';

export abstract class ContainerInterface {
  abstract bind(module: inversify.ContainerModule): void;
  abstract unbind(module: inversify.ContainerModule): void;
  abstract getContainer(): inversify.Container;
}
