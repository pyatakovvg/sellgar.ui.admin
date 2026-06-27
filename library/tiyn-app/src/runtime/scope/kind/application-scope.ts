import { SessionRuntimeStateInterface } from '../../../application/session/session-runtime-state';
import { RouterFrameAvailabilityInterface } from '../../../router/runtime/router-frame-availability';
import { RouterRuntime } from '../../../router/runtime/router-runtime';
import { RuntimeErrors, RuntimeErrorsInterface } from '../../errors';

import { RuntimeScope } from '../base';

export class ApplicationScope extends RuntimeScope {
  constructor() {
    super();

    this.register((registry) => {
      registry.bind(RuntimeErrorsInterface).to(RuntimeErrors).inSingletonScope();
    });
  }

  bindRouterRuntime(routerRuntime: RouterRuntime): void {
    this.register((registry) => {
      registry.bind(RouterFrameAvailabilityInterface).toConstantValue(routerRuntime);
      registry.bind(RouterRuntime).toConstantValue(routerRuntime);
    });
  }

  bindSession(session: SessionRuntimeStateInterface): void {
    this.register((registry) => {
      registry.bind(SessionRuntimeStateInterface).toConstantValue(session);
    });
  }
}
