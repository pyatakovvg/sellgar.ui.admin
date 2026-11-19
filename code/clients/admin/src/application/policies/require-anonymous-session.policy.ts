import { Policy, RoutePolicyInterface } from '@sellgar/app';
import type { PolicyResult, RuntimeContextInterface } from '@sellgar/app';

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
