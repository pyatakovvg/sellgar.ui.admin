import type { DataRouter } from 'react-router-dom';

export type NavigateLocation = (to: string | number, options?: any) => Promise<void>;
export type NavigateReplace = (to: string, options?: any) => Promise<void>;

export abstract class NavigateServiceInterface {
  abstract setRouter(router: DataRouter): void;
  abstract location: NavigateLocation;
  abstract replace: NavigateReplace;
}
