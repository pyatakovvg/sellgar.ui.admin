import { Policy, RoutePolicyInterface } from '@tiyn/app';
import type { PolicyResult, RuntimeContextInterface } from '@tiyn/app';

@Policy()
export class RequireAnonymousSessionPolicy extends RoutePolicyInterface {
  execute(context: RuntimeContextInterface): PolicyResult {
    if (context.session.phase === 'anonymous') {
      return { type: 'pass' };
    }

    return {
      reason: 'authenticated',
      type: 'fail',
    };
  }
}
