import { injectable } from 'inversify';

export const ConfigSymbol = Symbol.for('Config');

@injectable()
export class Config {
  get<T extends Window['env'], K extends keyof T>(key: K): T[K] {
    const env = window.env as T;
    return env[key];
  }
}
