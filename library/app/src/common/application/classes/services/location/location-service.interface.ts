import type { DataRouter } from 'react-router-dom';
import { ClassConstructor } from 'class-transformer';

export interface LocationData {
  params: Record<string, string | undefined>;
  searchParams: Record<string, any>;
  hashParams: Record<string, any>;
}

export abstract class LocationServiceInterface {
  abstract setRouter(router: DataRouter): void;
  abstract location: LocationData;
  abstract paramsToObject<T extends object>(Target: ClassConstructor<T>): T;
  abstract hashToObject<T extends object>(Target: ClassConstructor<T>): T;
  abstract searchToObject<T extends object>(Target: ClassConstructor<T>): T;
}
