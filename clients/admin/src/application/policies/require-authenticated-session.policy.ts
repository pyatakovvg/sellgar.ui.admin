import { Policy, RoutePolicyInterface } from '@sellgar/app-v2';
import type { PolicyResult, RuntimeContextInterface } from '@sellgar/app-v2';

@Policy()
export class RequireAuthenticatedSessionPolicy extends RoutePolicyInterface {
  execute(context: RuntimeContextInterface): PolicyResult {
    if (context.session.phase === 'authenticated') {
      return { type: 'pass' };
    }

    return {
      reason: 'anonymous',
      type: 'fail',
    };
  }
}
