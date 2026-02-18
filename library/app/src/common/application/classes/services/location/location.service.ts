import { injectable } from 'inversify';
import type { DataRouter } from 'react-router-dom';
import { validateSync } from 'class-validator';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';

import { parseHashToObject } from './utils/hash.utils.ts';
import { parseSearchParams } from './utils/search.utils.ts';

import { LocationServiceInterface, type LocationData } from './location-service.interface.ts';

export const createParamsFactorySync = <T extends object>(Target: ClassConstructor<T>) => {
  return (data: Record<string, any>) => {
    const result = plainToInstance(Target, data, {
      exposeUnsetFields: false,
      exposeDefaultValues: false,
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    const errors = validateSync(result, {
      forbidUnknownValues: false,
      skipMissingProperties: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
      whitelist: true,
    });

    if (errors.length > 0) {
      throw errors;
    }
    return instanceToPlain(result, {
      strategy: 'excludeAll',
      exposeUnsetFields: false,
      exposeDefaultValues: true,
      excludeExtraneousValues: false,
    }) as T;
  };
};

@injectable()
export class LocationService implements LocationServiceInterface {
  private router?: DataRouter;

  setRouter(router: DataRouter): void {
    this.router = router;
  }

  private getActiveLocation() {
    const fallbackLocation = {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: history.state,
      key: undefined,
    };

    if (!this.router) {
      return fallbackLocation;
    }

    return this.router.state.navigation.location ?? this.router.state.location ?? fallbackLocation;
  }

  get location(): LocationData {
    const location = this.getActiveLocation();
    const searchParams = parseSearchParams(location.search);
    const hashParams = parseHashToObject(location.hash);
    const params =
      this.router?.state.matches?.reduce<Record<string, string | undefined>>((acc, match) => {
        Object.assign(acc, match.params);
        return acc;
      }, {}) ?? {};

    return {
      params,
      hashParams,
      searchParams,
    };
  }

  paramsToObject<T extends object>(Target: ClassConstructor<T>): T {
    const params =
      this.router?.state.matches?.reduce<Record<string, string | undefined>>((acc, match) => {
        Object.assign(acc, match.params);
        return acc;
      }, {}) ?? {};

    return createParamsFactorySync(Target)(params);
  }

  hashToObject<T extends object>(Target: ClassConstructor<T>): T {
    const hashParams = parseHashToObject(this.getActiveLocation().hash);
    return createParamsFactorySync(Target)(hashParams);
  }

  searchToObject<T extends object>(Target: ClassConstructor<T>): T {
    const searchParams = parseSearchParams(this.getActiveLocation().search);
    return createParamsFactorySync(Target)(searchParams);
  }
}
