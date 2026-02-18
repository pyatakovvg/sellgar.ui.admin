import { injectable } from 'inversify';
import type { DataRouter } from 'react-router-dom';

import {
  RevalidateServiceInterface,
  type RevalidateKey,
  type RevalidateHandler,
} from './revalidate-service.interface.ts';

@injectable()
export class RevalidateService implements RevalidateServiceInterface {
  private router?: DataRouter;
  private readonly handlers = new Map<RevalidateKey, Set<RevalidateHandler>>();
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

  register(key: RevalidateKey, handler: RevalidateHandler): void {
    const set = this.handlers.get(key) ?? new Set<RevalidateHandler>();
    set.add(handler);
    this.handlers.set(key, set);
  }

  unregister(key: RevalidateKey, handler: RevalidateHandler): void {
    const set = this.handlers.get(key);
    if (!set) return;

    set.delete(handler);
    if (set.size === 0) {
      this.handlers.delete(key);
    }
  }

  private async runHandlers(handlers: Iterable<RevalidateHandler>): Promise<void> {
    await Promise.allSettled(Array.from(handlers).map((handler) => Promise.resolve(handler())));
  }

  async revalidate(key?: RevalidateKey): Promise<void> {
    if (key) {
      const set = this.handlers.get(key);

      if (!set || set.size === 0) {
        return;
      }

      await this.runHandlers(set);
      return;
    }

    if (this.handlers.size > 0) {
      const allHandlers = new Set<RevalidateHandler>();
      this.handlers.forEach((set) => {
        set.forEach((handler) => allHandlers.add(handler));
      });

      await this.runHandlers(allHandlers);
      return;
    }

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
