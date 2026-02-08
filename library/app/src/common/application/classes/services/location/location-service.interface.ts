import type { DataRouter } from 'react-router-dom';

export interface LocationData {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key?: string;
  params: Record<string, string | undefined>;
  searchParams: Record<string, string>;
  hashParams: Record<string, any>;
}

export abstract class LocationServiceInterface {
  abstract setRouter(router: DataRouter): void;
  abstract location: LocationData;
}
