import { ApplicationControllerInterface } from '../classes/controller/application-controller.interface.ts';
import { GuardInterface, GuardHook, GuardRunStage } from '../application.interface.tsx';

export class GuardRunner {
  private readonly initMap: Record<GuardHook, WeakSet<GuardInterface>> = {
    router: new WeakSet<GuardInterface>(),
    private: new WeakSet<GuardInterface>(),
    public: new WeakSet<GuardInterface>(),
  };
  private readonly stageMap: Record<GuardHook, GuardRunStage> = {
    router: 'init',
    private: 'init',
    public: 'init',
  };

  async run(
    hook: GuardHook,
    guards: GuardInterface[] | undefined,
    controller: ApplicationControllerInterface,
  ): Promise<void> {
    const initSet = this.initMap[hook];
    const stage = this.stageMap[hook];

    for (const guard of guards ?? []) {
      const runOn = guard.runOn?.[hook] ?? 'init';

      if (runOn === 'init') {
        if (stage !== 'init' || initSet.has(guard)) {
          continue;
        }

        const executed = await this.execute(hook, guard, controller);
        if (executed) {
          initSet.add(guard);
        }
        continue;
      }

      await this.execute(hook, guard, controller);
    }

    if (stage === 'init') {
      this.stageMap[hook] = 'navigation';
    }
  }

  private async execute(
    hook: GuardHook,
    guard: GuardInterface,
    controller: ApplicationControllerInterface,
  ): Promise<boolean> {
    if (hook === 'router') {
      if (guard.beforeRouter) {
        await guard.beforeRouter(controller);
        return true;
      }

      return false;
    }

    if (hook === 'private') {
      if (guard.beforePrivate) {
        await guard.beforePrivate(controller);
        return true;
      }

      return false;
    }

    if (guard.beforePublic) {
      await guard.beforePublic(controller);
      return true;
    }

    return false;
  }
}
