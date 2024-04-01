export const APPLICATION_ERROR = 'APPLICATION_ERROR';
export const APPLICATION_UNAUTHORIZED = 'APPLICATION_UNAUTHORIZED';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
