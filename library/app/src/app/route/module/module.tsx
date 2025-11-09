import React from 'react';
import { Container, ContainerModule } from 'inversify';
import { Params } from 'react-router-dom';

import { ModuleProvider } from './module.provider.tsx';
import { MODULE_METADATA_KEY } from './decorators/module.decorator.ts';

export interface IClassModuleArgs<T = any> {
  container: Container;
  controller: T extends infer T ? T : any;
  bindModule?(container: ContainerModule): void;
  unbindModule?(container: ContainerModule): void;
  params: Params;
}

export interface IClassModule<T = any> {
  destructor?(args: IClassModuleArgs<T>): void;
  loader?(args: IClassModuleArgs<T>): unknown;
  render(args: IClassModuleArgs<T>): React.JSX.Element;
}

export class Module<TController = any> {
  private instance?: IClassModule<TController>;
  private controller: TController extends infer T ? T : any;

  constructor(private readonly ClassModule: new (args: IClassModuleArgs<TController>) => IClassModule<TController>) {}

  create(args: IClassModuleArgs<TController>) {
    this.destructor({ ...args, controller: this.controller });

    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule);

    if (metaData?.container) {
      args.container.loadSync(metaData.container);
    }

    if (metaData?.controller) {
      this.controller = args.container.get(metaData.controller);
    }

    this.instance = new this.ClassModule({ ...args, controller: this.controller });

    if (!this.instance) {
      throw new Error('LazyRoute: instance is undefined');
    }
  }

  destructor(args: IClassModuleArgs<TController>) {
    if (this.instance) {
      const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule);

      if (metaData?.container) {
        args.container.unloadSync(metaData.containerModule);
      }

      if (this.instance.destructor) {
        this.instance.destructor({ ...args, controller: this.controller });
        delete this.instance;
      }
    }
  }

  loader(args: IClassModuleArgs<TController>) {
    if (this.instance?.loader) {
      return this.instance.loader({ ...args, controller: this.controller });
    }
  }

  render(args: IClassModuleArgs<TController>) {
    return (
      <ModuleProvider instance={this.ClassModule}>
        {this.instance?.render({ ...args, controller: this.controller })}
      </ModuleProvider>
    );
  }
}
