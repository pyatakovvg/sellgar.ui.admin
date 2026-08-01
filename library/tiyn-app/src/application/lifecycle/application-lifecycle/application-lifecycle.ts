import type { RuntimeErrorReport } from '../../reporting/runtime-error-report';

export type ApplicationLifecyclePhase =
  'created' | 'composing' | 'composed' | 'initializing' | 'ready' | 'failed' | 'disposing' | 'disposed';

export interface ApplicationLifecycleSnapshot {
  readonly error: unknown;
  readonly phase: ApplicationLifecyclePhase;
}

export abstract class ApplicationControllerInterface {
  abstract get lifecycle(): ApplicationLifecycleSnapshot;

  abstract reportError(report: RuntimeErrorReport): void;
}
