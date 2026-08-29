import { Policy, RoutePolicyInterface } from '@sellgar/app-v2';
import type { PolicyResult, RuntimeContextInterface } from '@sellgar/app-v2';

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
