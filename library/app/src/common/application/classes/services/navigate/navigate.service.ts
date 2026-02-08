import { injectable } from 'inversify';
import type { DataRouter } from 'react-router-dom';

import { NavigateServiceInterface } from './navigate-service.interface.ts';
import { createHashFromObject, parseHashToObject } from '../../../../router/hooks/navigate/hash/hash.utils.ts';

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

  get hash(): NavigateServiceInterface['hash'] {
    return (to, options) => this.navigateHash(to, options);
  }

  get searchParams(): NavigateServiceInterface['searchParams'] {
    return (params, options) => this.navigateSearchParams(params, options);
  }

  private navigateHash(
    to: Parameters<NavigateServiceInterface['hash']>[0],
    options: Parameters<NavigateServiceInterface['hash']>[1],
  ): Promise<void> {
    const merge = options?.merge ?? true;
    const base = merge ? parseHashToObject(window.location.hash) : {};
    const newHash = createHashFromObject({ ...base, ...to });
    const replace = options?.replace ?? true;
    const target = newHash
      ? `${window.location.pathname}${window.location.search}#${newHash}`
      : `${window.location.pathname}${window.location.search}`;

    return this.navigate(target, undefined, replace);
  }

  private navigateSearchParams(
    params: Parameters<NavigateServiceInterface['searchParams']>[0],
    options: Parameters<NavigateServiceInterface['searchParams']>[1],
  ): Promise<void> {
    const merge = options?.merge ?? true;
    const clearUndefined = options?.clearUndefined ?? true;
    const replace = options?.replace ?? true;

    const baseUrl = new URL(window.location.href);
    const newParams = new URLSearchParams(merge ? baseUrl.search : '');

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        if (clearUndefined) {
          newParams.delete(key);
        }
        return;
      }

      if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach((item) => {
          if (item !== null && item !== undefined) {
            const encodedValue = encodeURIComponent(typeof item === 'object' ? JSON.stringify(item) : String(item));
            newParams.append(key, encodedValue);
          }
        });
        return;
      }

      let stringValue: string;
      if (typeof value === 'object') {
        stringValue = encodeURIComponent(JSON.stringify(value));
      } else if (typeof value === 'boolean') {
        stringValue = encodeURIComponent(value.toString());
      } else {
        stringValue = encodeURIComponent(String(value));
      }

      newParams.set(key, stringValue);
    });

    const target = `${baseUrl.pathname}?${newParams.toString()}${baseUrl.hash}`;
    return this.navigate(target, undefined, replace);
  }

  private navigate(
    to: Parameters<NavigateServiceInterface['location']>[0],
    options: Parameters<NavigateServiceInterface['location']>[1],
    replace: boolean,
  ): Promise<void> {
    const router = this.router;
    const target = typeof to === 'number' ? to : to.toString();

    if (router) {
      return router.navigate(
        target as any,
        {
          ...(options ?? {}),
          replace,
          viewTransition: true,
        } as any,
      );
    }

    return new Promise<void>((resolve, reject) => {
      this.pendingNavigate.push({
        action: (nextRouter) =>
          nextRouter.navigate(
            target as any,
            {
              ...(options ?? {}),
              replace,
              viewTransition: true,
            } as any,
          ),
        resolve,
        reject,
      });
    });
  }
}
