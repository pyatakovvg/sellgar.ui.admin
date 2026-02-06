import { ContainerInterface } from '../container';

import { IOptions, GuardInterface } from './application.interface.tsx';
import { GuardRunner } from './guards/guard-runner.ts';

export class ApplicationContext {
  constructor(
    public options: IOptions,
    public guards: GuardInterface[],
    public guardRunner: GuardRunner,
    public container: ContainerInterface,
  ) {}
}
