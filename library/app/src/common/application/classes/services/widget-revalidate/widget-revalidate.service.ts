import { injectable } from 'inversify';

import {
  WidgetRevalidateServiceInterface,
  type WidgetRevalidateKey,
  type WidgetRevalidateHandler,
} from './widget-revalidate-service.interface.ts';

@injectable()
export class WidgetRevalidateService implements WidgetRevalidateServiceInterface {
  private readonly handlers = new Map<WidgetRevalidateKey, Set<WidgetRevalidateHandler>>();

  register(key: WidgetRevalidateKey, handler: WidgetRevalidateHandler): void {
    const set = this.handlers.get(key) ?? new Set<WidgetRevalidateHandler>();
    set.add(handler);
    this.handlers.set(key, set);
  }

  unregister(key: WidgetRevalidateKey, handler: WidgetRevalidateHandler): void {
    const set = this.handlers.get(key);
    if (!set) return;

    set.delete(handler);
    if (set.size === 0) {
      this.handlers.delete(key);
    }
  }

  revalidate(key: WidgetRevalidateKey): void {
    const set = this.handlers.get(key);
    if (!set) return;

    set.forEach((handler) => handler());
  }

  revalidateAll(): void {
    this.handlers.forEach((set) => {
      set.forEach((handler) => handler());
    });
  }
}
