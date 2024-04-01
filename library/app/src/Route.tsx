import React from 'react';

interface IRouteOptions {
  layout?: any;
  Splash?: React.FC;
  isPublic?: boolean;
  isCacheable?: boolean;
}

export class Route {
  constructor(
    readonly path: string,
    readonly content: any | Route[],
    readonly options?: IRouteOptions,
  ) {}

  static async loadModule(content: Promise<any> | Function) {
    if (content instanceof Function) {
      content = content();
    }
    const module = await content;
    return module.default;
  }
}
