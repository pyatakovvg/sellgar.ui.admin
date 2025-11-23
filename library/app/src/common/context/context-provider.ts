import { ContextProviderInterface } from './context-provider.interface.ts';

export class ContextProvider implements ContextProviderInterface {
  private readonly map = new Map<any, any>();

  constructor() {
    console.log('ContextProvider: constructor - start');
    console.log('ContextProvider: constructor - finish');
  }

  bind<T>(key: any, context: T) {
    console.log('ContextProvider: bind');
    this.map.set(key, context);
  }

  get<T>(key: any): T {
    console.log('ContextProvider: get');
    return this.map.get(key);
  }
}
