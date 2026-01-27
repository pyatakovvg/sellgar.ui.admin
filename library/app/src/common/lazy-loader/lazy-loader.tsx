import React from 'react';
import ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext } from '../application';
import { Controller } from '../module/controller';
import { MODULE_METADATA_KEY, type ModuleMetadata } from '../module';

import { LazyLoaderProvider } from './lazy-loader.provider.tsx';

import { LazyLoaderInterface } from './lazy-loader.interface.ts';

const lastInstance: Set<any> = new Set<any>();

export type LoaderArgs = ReactRouter.LoaderFunctionArgs;

export class LazyLoader implements LazyLoaderInterface {
  private static controller = new Controller();

  private instance: any;
  private isCreated: boolean = false;
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
          LazyLoader.controller.set(controller);
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
            controllerInstance = LazyLoader.controller.get(controller);
          } catch (error) {
            return void 0;
          }
          controllerInstance.destructor?.(args);

          LazyLoader.controller.remove(controller);
        });
      }
    }
  }

  create(args: ReactRouter.LoaderFunctionArgs) {
    if (this.isCreated) {
      return void 0;
    }

    this.lastArgs = args;

    if (lastInstance.size) {
      lastInstance.forEach((instance) => {
        this.unloadMetaData(args, instance);

        lastInstance.delete(instance);
      });
    }

    this.loadMetaData();

    this.instance = new this.ClassModule();

    lastInstance.add(this.instance);
  }

  async loader(args: ReactRouter.LoaderFunctionArgs) {
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule) as ModuleMetadata;

    return await Promise.all(
      metaData.controllers.map((controller) => {
        const controllerInstance = LazyLoader.controller.get(controller);

        if (!controllerInstance) {
          return void 0;
        }
        return controllerInstance.loader?.(args);
      }),
    );
  }

  remove() {
    lastInstance.delete(this.instance);
  }

  render() {
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule) as ModuleMetadata;

    React.useEffect(() => {
      this.isCreated = true;
      return () => {
        this.isCreated = false;
        if (this.instance) {
          this.unloadMetaData(this.lastArgs, this.instance);
          this.remove();
        }
      };
    }, []);

    return <LazyLoaderProvider controller={LazyLoader.controller}>{metaData.view}</LazyLoaderProvider>;
  }
}
