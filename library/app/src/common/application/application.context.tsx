import { ContainerInterface } from '../container';

import type { IOptions } from './application.interface.tsx';

export class ApplicationContext {
  constructor(
    public options: IOptions,
    public container: ContainerInterface,
  ) {}
}
