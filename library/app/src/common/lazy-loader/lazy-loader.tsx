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
  private destroyPromise: Promise<void> | null = null;
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

  private async unloadMetaData(args: ReactRouter.LoaderFunctionArgs | undefined, instance: any) {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const metaData = Reflect.getMetadata(MODULE_METADATA_KEY, instance.constructor) as ModuleMetadata;

    if (!metaData) {
      return;
    }

    const controllerIds = metaData.controllers ?? [];
    const controllerEntries = controllerIds
      .map((controller) => {
        try {
          const controllerInstance = this.controller.get(controller) as { destructor?: (args?: unknown) => unknown };
          return { controller, controllerInstance };
        } catch (error) {
          return null;
        }
      })
      .filter((entry): entry is { controller: any; controllerInstance: { destructor?: (args?: unknown) => unknown } } =>
        Boolean(entry),
      );

    await Promise.allSettled(
      controllerEntries.map(({ controllerInstance }) => Promise.resolve(controllerInstance.destructor?.(args))),
    );

    controllerEntries.forEach(({ controller }) => {
      this.controller.remove(controller);
    });

    (metaData.imports ?? []).forEach((containerModule) => {
      applicationContext.container.unbind(containerModule);
    });
  }

  private destroy(args: ReactRouter.LoaderFunctionArgs | undefined) {
    if (this.destroyPromise) {
      return this.destroyPromise;
    }

    const instance = this.instance;
    if (!instance) {
      return Promise.resolve();
    }

    this.destroyPromise = this.unloadMetaData(args, instance).finally(() => {
      this.remove();
      this.destroyPromise = null;
    });

    return this.destroyPromise;
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
          void this.destroy(this.lastArgs);
        }
      };
    }, [handleRevalidate, metaData.controllers, revalidateService]);

    return <LazyLoaderProvider controller={this.controller}>{metaData.view}</LazyLoaderProvider>;
  }
}
