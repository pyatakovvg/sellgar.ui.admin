import * as inversify from 'inversify';

import { ContainerInterface } from './container.interface.ts';

export class Container implements ContainerInterface {
  private readonly moduleRefCount: Map<inversify.ContainerModule, number> = new Map();
  private readonly container: inversify.Container = new inversify.Container();

  bind(module: inversify.ContainerModule) {
    const current = this.moduleRefCount.get(module) ?? 0;

    if (current === 0) {
      console.info('Container: container load');
      this.container.loadSync(module);
    }

    this.moduleRefCount.set(module, current + 1);
  }

  unbind(module: inversify.ContainerModule) {
    const current = this.moduleRefCount.get(module) ?? 0;

    if (current === 0) {
      return void 0;
    }

    if (current === 1) {
      this.moduleRefCount.delete(module);
      console.info('Container: container unload');
      this.container.unloadSync(module);
      return void 0;
    }

    this.moduleRefCount.set(module, current - 1);
  }

  getContainer() {
    return this.container;
  }
}
