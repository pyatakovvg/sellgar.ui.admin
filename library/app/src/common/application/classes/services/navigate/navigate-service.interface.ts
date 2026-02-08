import type { DataRouter } from 'react-router-dom';

export type NavigateLocation = (to: string | number, options?: any) => Promise<void>;
export type NavigateReplace = (to: string, options?: any) => Promise<void>;
export type NavigateHash = (to: Record<string, any>, options?: { replace?: boolean; merge?: boolean }) => Promise<void>;
export type NavigateSearchParams = (
  params: Record<string, any>,
  options?: { replace?: boolean; merge?: boolean; clearUndefined?: boolean },
) => Promise<void>;

export abstract class NavigateServiceInterface {
  abstract setRouter(router: DataRouter): void;
  abstract location: NavigateLocation;
  abstract replace: NavigateReplace;
  abstract hash: NavigateHash;
  abstract searchParams: NavigateSearchParams;
}
