import * as inversify from 'inversify';

import { ContainerInterface } from './container.interface.ts';

export class Container implements ContainerInterface {
  private readonly cache: Set<inversify.ContainerModule> = new Set();
  private readonly container: inversify.Container = new inversify.Container();

  bind(module: inversify.ContainerModule) {
    if (this.cache.has(module)) {
      return void 0;
    }
    this.cache.add(module);

    console.info('Container: container load');

    this.container.loadSync(module);
  }

  unbind(module: inversify.ContainerModule) {
    if (!this.cache.has(module)) {
      return void 0;
    }
    this.cache.delete(module);

    console.info('Container: container unload');

    this.container.unloadSync(module);
  }

  getContainer() {
    return this.container;
  }
}
