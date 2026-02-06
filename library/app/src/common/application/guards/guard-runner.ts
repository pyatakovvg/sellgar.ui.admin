import { ApplicationControllerInterface } from '../classes/controller/application-controller.interface.ts';
import { GuardInterface } from '../application.interface.tsx';

type GuardHook = 'router' | 'private' | 'public';

export class GuardRunner {
  private readonly onceMap: Record<GuardHook, WeakSet<GuardInterface>> = {
    router: new WeakSet<GuardInterface>(),
    private: new WeakSet<GuardInterface>(),
    public: new WeakSet<GuardInterface>(),
  };

  async runOnce(
    hook: GuardHook,
    guards: GuardInterface[] | undefined,
    controller: ApplicationControllerInterface,
  ): Promise<void> {
    const onceSet = this.onceMap[hook];

    for (const guard of guards ?? []) {
      if (onceSet.has(guard)) {
        continue;
      }

      let executed = false;

      if (hook === 'router') {
        if (guard.beforeRouter) {
          await guard.beforeRouter(controller);
          executed = true;
        }
      } else if (hook === 'private') {
        if (guard.beforePrivate) {
          await guard.beforePrivate(controller);
          executed = true;
        }
      } else {
        if (guard.beforePublic) {
          await guard.beforePublic(controller);
          executed = true;
        }
      }

      if (executed) {
        onceSet.add(guard);
      }
    }
  }
}
