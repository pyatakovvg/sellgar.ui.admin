import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext, RevalidateServiceInterface } from '../application';
import { Controller } from '../module/controller';
import { MODULE_METADATA_KEY, type ModuleMetadata } from '../module';

import { LazyLoaderProvider } from './lazy-loader.provider.tsx';

import { LazyLoaderInterface } from './lazy-loader.interface.ts';

export type LoaderArgs = ReactRouter.LoaderFunctionArgs;

export class LazyLoader implements LazyLoaderInterface {
  private readonly controller = new Controller();

  private instance: any;
  private isCreated: boolean = false;
  private isDestroyed: boolean = false;
  private lastArgs?: ReactRouter.LoaderFunctionArgs;

  constructor(private readonly ClassModule: new () => any) {}

  private loadMetaData() {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule) as ModuleMetadata;

    if (metaData) {
      if (metaData.imports) {
        metaData.imports.forEach((containerModule) => {
          applicationContext.container.bind(containerModule);
        });
      }

      if (metaData.controllers) {
        metaData.controllers.forEach((controller: any) => {
          this.controller.set(controller);
        });
      }
    }
  }

  private unloadMetaData(args: ReactRouter.LoaderFunctionArgs | undefined, instance: any) {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, instance.constructor) as ModuleMetadata;

    if (metaData) {
      if (metaData.imports) {
        metaData.imports.forEach((containerModule) => {
          applicationContext.container.unbind(containerModule);
        });
      }

      if (metaData.controllers) {
        metaData.controllers.forEach(async (controller) => {
          let controllerInstance: any;
          try {
            controllerInstance = this.controller.get(controller);
          } catch (error) {
            return void 0;
          }
          controllerInstance.destructor?.(args);

          this.controller.remove(controller);
        });
      }
    }
  }

  create(args: ReactRouter.LoaderFunctionArgs) {
    if (this.isCreated) {
      return void 0;
    }

    this.lastArgs = args;

    this.loadMetaData();

    this.instance = new this.ClassModule();
    this.isDestroyed = false;
  }

  async loader(args: ReactRouter.LoaderFunctionArgs) {
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule) as ModuleMetadata;

    return await Promise.all(
      metaData.controllers.map((controller) => {
        const controllerInstance = this.controller.get(controller);

        if (!controllerInstance) {
          return void 0;
        }
        return controllerInstance.loader?.(args);
      }),
    );
  }

  remove() {
    this.instance = undefined;
  }

  render() {
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule) as ModuleMetadata;
    const revalidate = ReactRouter.useRevalidator();
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const revalidateService = applicationContext.container.getContainer().get(RevalidateServiceInterface);
    const handleRevalidate = React.useCallback(() => revalidate.revalidate(), [revalidate]);

    React.useEffect(() => {
      const keys = metaData.controllers ?? [];
      keys.forEach((key) => revalidateService.register(key, handleRevalidate));

      this.isCreated = true;
      return () => {
        keys.forEach((key) => revalidateService.unregister(key, handleRevalidate));
        this.isCreated = false;
        if (this.instance && !this.isDestroyed) {
          this.isDestroyed = true;
          this.unloadMetaData(this.lastArgs, this.instance);
          this.remove();
        }
      };
    }, [handleRevalidate, metaData.controllers, revalidateService]);

    return <LazyLoaderProvider controller={this.controller}>{metaData.view}</LazyLoaderProvider>;
  }
}
