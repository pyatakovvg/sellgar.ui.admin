import type { ApplicationControllerInterface } from '../../application/lifecycle/application-lifecycle';
import type { SessionRuntimeStateInterface } from '../../application/session/session-runtime-state';
import type { RuntimeErrorsInterface } from '../errors';

export interface RuntimeContextInterface {
  readonly app: ApplicationControllerInterface;
  readonly errors: RuntimeErrorsInterface;
  readonly session: SessionRuntimeStateInterface;
  readonly signal: AbortSignal;
}
