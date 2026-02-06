import { injectable } from 'inversify';
import type { DataRouter } from 'react-router-dom';

import { NavigateServiceInterface } from './navigate-service.interface.ts';

@injectable()
export class NavigateService implements NavigateServiceInterface {
  private router?: DataRouter;
  private readonly pendingNavigate: Array<{
    action: (router: DataRouter) => Promise<void>;
    resolve: () => void;
    reject: (error: unknown) => void;
  }> = [];

  setRouter(router: DataRouter): void {
    this.router = router;

    if (this.pendingNavigate.length > 0) {
      const queue = this.pendingNavigate.splice(0, this.pendingNavigate.length);
      for (const item of queue) {
        item.action(router).then(item.resolve).catch(item.reject);
      }
    }
  }

  get location(): NavigateServiceInterface['location'] {
    return (to, options) => this.navigate(to, options, false);
  }

  get replace(): NavigateServiceInterface['replace'] {
    return (to, options) => this.navigate(to, options, true);
  }

  private navigate(
    to: Parameters<NavigateServiceInterface['location']>[0],
    options: Parameters<NavigateServiceInterface['location']>[1],
    replace: boolean,
  ): Promise<void> {
    const router = this.router;
    const target = typeof to === 'number' ? to : to.toString();

    if (router) {
      return router.navigate(target as any, {
        ...(options ?? {}),
        replace,
        viewTransition: true,
      } as any);
    }

    return new Promise<void>((resolve, reject) => {
      this.pendingNavigate.push({
        action: (nextRouter) =>
          nextRouter.navigate(target as any, {
            ...(options ?? {}),
            replace,
            viewTransition: true,
          } as any),
        resolve,
        reject,
      });
    });
  }

}
