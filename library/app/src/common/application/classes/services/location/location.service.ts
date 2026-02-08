import { injectable } from 'inversify';
import type { DataRouter } from 'react-router-dom';

import { parseHashToObject } from '../../../../router/hooks/navigate/hash/hash.utils.ts';
import { LocationServiceInterface, type LocationData } from './location-service.interface.ts';

@injectable()
export class LocationService implements LocationServiceInterface {
  private router?: DataRouter;

  setRouter(router: DataRouter): void {
    this.router = router;
  }

  get location(): LocationData {
    const fallbackLocation = {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: history.state,
      key: undefined,
    };
    const location = this.router?.state.location ?? fallbackLocation;
    const searchParams = Object.fromEntries(new URLSearchParams(location.search).entries());
    const hashParams = parseHashToObject(location.hash);
    const params =
      this.router?.state.matches?.reduce<Record<string, string | undefined>>((acc, match) => {
        Object.assign(acc, match.params);
        return acc;
      }, {}) ?? {};

    return {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
      key: location.key,
      params,
      searchParams,
      hashParams,
    };
  }
}
