import { LoaderFunctionArgs } from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext } from '../application';
import { Controller } from '../module/controller';
import { MODULE_METADATA_KEY, type ModuleMetadata } from '../module';

import { LazyLoaderProvider } from './lazy-loader.provider.tsx';

import { LazyLoaderInterface } from './lazy-loader.interface.ts';

const lastInstance: Set<any> = new Set<any>();

export class LazyLoader implements LazyLoaderInterface {
  private instance: any;
  private static controller = new Controller();

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

  private unloadMetaData(args: LoaderFunctionArgs, instance: any) {
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
          const controllerInstance = LazyLoader.controller.get(controller);

          if (!controllerInstance) {
            return void 0;
          }
          controllerInstance.destructor?.(args);

          LazyLoader.controller.remove(controller);
        });
      }
    }
  }

  create(args: LoaderFunctionArgs) {
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

  async loader(args: LoaderFunctionArgs) {
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, this.ClassModule) as ModuleMetadata;

    return await Promise.all(
      metaData.controllers.map((controller: any) => {
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

    return <LazyLoaderProvider controller={LazyLoader.controller}>{metaData.view}</LazyLoaderProvider>;
  }
}
