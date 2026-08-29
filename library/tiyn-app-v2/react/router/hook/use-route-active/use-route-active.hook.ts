import type { RouteMatchOptions, RouteToken } from '../../../../core/router/declaration/route-token';
import { matchesNavigationRoute } from '../../../../core/router/runtime/navigation-state';
import { useNavigationState } from '../../runtime/navigation-state-context';

export const useRouteActive = <TToken extends RouteToken>(
  token: TToken,
  options: RouteMatchOptions<TToken> = {},
): boolean => {
  const navigation = useNavigationState();

  return matchesNavigationRoute(navigation.snapshot.navigation, token, options);
};
