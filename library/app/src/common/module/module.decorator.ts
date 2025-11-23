import React from 'react';
import { ContainerModule } from 'inversify';

export const MODULE_METADATA_KEY = Symbol('module:metadata');

export interface ModuleMetadata {
  imports: ContainerModule[];
  controllers: any[];
  view: React.ReactNode;
}

export function Module(metadata: ModuleMetadata) {
  return function <T extends { new (): any }>(constructor: T): T {
    Reflect.defineMetadata(MODULE_METADATA_KEY, metadata, constructor);

    return constructor;
  };
}
