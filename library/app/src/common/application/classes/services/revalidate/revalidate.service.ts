import { injectable } from 'inversify';
import type { DataRouter } from 'react-router-dom';

import { RevalidateServiceInterface } from './revalidate-service.interface.ts';

@injectable()
export class RevalidateService implements RevalidateServiceInterface {
  private router?: DataRouter;
  private readonly pending: Array<{
    action: (router: DataRouter) => Promise<void>;
    resolve: () => void;
    reject: (error: unknown) => void;
  }> = [];

  setRouter(router: DataRouter): void {
    this.router = router;

    if (this.pending.length > 0) {
      const queue = this.pending.splice(0, this.pending.length);
      for (const item of queue) {
        item.action(router).then(item.resolve).catch(item.reject);
      }
    }
  }

  revalidate(): Promise<void> {
    const router = this.router;

    if (router) {
      return router.revalidate();
    }

    return new Promise<void>((resolve, reject) => {
      this.pending.push({
        action: (nextRouter) => nextRouter.revalidate(),
        resolve,
        reject,
      });
    });
  }
}
