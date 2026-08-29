import type { NavigationRequestFactory } from '../../../../core/router/service/navigation-request';
import { createNavigationRequest } from '../../../../core/router/service/navigation-request';
import { matchesNavigationState } from '../../../../core/router/runtime/navigation-state';
import type { NavigationState } from '../../../../core/router/runtime/navigation-state';
import { executeNavigateRequest, resolveNavigateRequest } from '../../../../core/router/service/navigate-service';
import { useNavigationState } from '../../runtime/navigation-state-context';
import { useNavigate } from '../use-navigate';

export interface NavigationControl {
  readonly execute: () => Promise<void>;
  readonly isActive: boolean;
  readonly isPending: boolean;
  readonly target: NavigationState;
}

export const useNavigationControl = (factory: NavigationRequestFactory, end: boolean): NavigationControl => {
  const navigate = useNavigate();
  const navigation = useNavigationState();
  const request = createNavigationRequest(factory);
  const target = resolveNavigateRequest(navigate, request);

  return {
    execute: () => executeNavigateRequest(navigate, request),
    isActive: matchesNavigationState(navigation.snapshot.navigation, target, { end }),
    isPending: matchesNavigationState(navigation.snapshot.pending, target, { end }),
    target,
  };
};
