import { Policy, RoutePolicyInterface, type PolicyResult, type RuntimeContextInterface } from '@sellgar/app-v2';

@Policy()
export class RequireAnonymousSessionPolicy extends RoutePolicyInterface {
  execute(context: RuntimeContextInterface): PolicyResult {
    return context.session.phase === 'authenticated' ? { reason: 'authenticated', type: 'fail' } : { type: 'pass' };
  }
}
