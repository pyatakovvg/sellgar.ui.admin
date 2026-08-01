import { SessionRuntimeStateInterface } from '../../../application/session/session-runtime-state';
import { RouterFrameAvailabilityInterface } from '../../../router/runtime/router-frame-availability';
import { RouterRuntime } from '../../../router/runtime/router-runtime';
import { RuntimeErrors, RuntimeErrorsInterface } from '../../errors';

import { RuntimeScope } from '../base';

import { ProviderScope } from './provider-scope.ts';

export class ApplicationScope extends RuntimeScope {
  private readonly providerScope: ProviderScope;

  constructor() {
    super();

    this.providerScope = new ProviderScope(this);

    this.register((registry) => {
      registry.bind(ProviderScope).toConstantValue(this.providerScope);
      registry.bind(RuntimeErrorsInterface).to(RuntimeErrors).inSingletonScope();
    });
  }

  override dispose(): void {
    this.providerScope.dispose();
    super.dispose();
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
