import React from 'react';

import type { Type } from '../variables.ts';

interface IModuleMetadata<T> {
  view: React.ReactElement;
  controller?: Type<T>;
}

export function Module<T = any>(metadata: IModuleMetadata<T>): ClassDecorator {
  return (target: object) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}
