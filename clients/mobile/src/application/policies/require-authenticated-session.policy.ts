import { Policy, RoutePolicyInterface, type PolicyResult, type RuntimeContextInterface } from '@sellgar/app-v2';

@Policy()
export class RequireAuthenticatedSessionPolicy extends RoutePolicyInterface {
  execute(context: RuntimeContextInterface): PolicyResult {
    return context.session.phase === 'authenticated' ? { type: 'pass' } : { reason: 'anonymous', type: 'fail' };
  }
}
