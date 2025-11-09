import { ContainerModule } from 'inversify';

import { IClassModule, IClassModuleArgs } from '../module.tsx';

export const MODULE_METADATA_KEY = Symbol('module:metadata');

interface ModuleMetadata<T = any> {
  container?: any;
  controller?: T;
}

export function Module(metadata: ModuleMetadata) {
  return function <T extends { new (args: IClassModuleArgs): IClassModule }>(constructor: T) {
    Reflect.defineMetadata(MODULE_METADATA_KEY, metadata, constructor);

    return constructor;
  };
}
