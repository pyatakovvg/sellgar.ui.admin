export type RuntimeErrorSeverity = 'critical' | 'error' | 'info' | 'warning';

export type RuntimeErrorCode =
  | 'application.disposable.dispose_failed'
  | 'application.event.handler_failed'
  | 'application.initializer.failed'
  | 'frame.provider_before_render_failed'
  | 'frame.provider_dispose_failed'
  | 'revalidate.handler.failed'
  | 'route.provider_before_load_failed'
  | 'route.provider_before_render_failed'
  | 'route.provider_dispose_failed'
  | 'route.module.commit_cleanup_failed'
  | 'route.module.discard_cleanup_failed'
  | 'route.module.dispose_failed'
  | 'route.module.provider_before_load_failed'
  | 'route.module.provider_before_render_failed'
  | 'route.module.provider_dispose_failed';

export interface RuntimeErrorReport {
  readonly code: RuntimeErrorCode;
  readonly error: unknown;
  readonly severity?: RuntimeErrorSeverity;
}

export interface NormalizedRuntimeErrorReport {
  readonly code: RuntimeErrorCode;
  readonly error: unknown;
  readonly phase: RuntimeErrorPhase;
  readonly severity: RuntimeErrorSeverity;
  readonly source: RuntimeErrorSource;
}

export type RuntimeErrorPhase =
  | 'application.dispose'
  | 'application.event'
  | 'application.initialize'
  | 'frame.provider.before_render'
  | 'frame.provider.dispose'
  | 'revalidate'
  | 'route.provider.before_load'
  | 'route.provider.before_render'
  | 'route.provider.dispose'
  | 'route.module.commit'
  | 'route.module.discard'
  | 'route.module.dispose'
  | 'route.module.provider.before_load'
  | 'route.module.provider.before_render'
  | 'route.module.provider.dispose';

export type RuntimeErrorSource =
  | 'application.disposable'
  | 'application.event'
  | 'application.initializer'
  | 'frame.provider'
  | 'revalidate.handler'
  | 'route.provider'
  | 'route.module'
  | 'route.module.provider';
