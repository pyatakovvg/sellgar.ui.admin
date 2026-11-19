import { Injectable } from '@sellgar/app';

import { ConfigInterface } from './config.interface.ts';

@Injectable()
export class Config implements ConfigInterface {
  get<T extends Window['env'], K extends keyof T>(key: K): T[K] {
    const env = window.env as T;
    return env[key];
  }
}
