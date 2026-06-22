export interface RuntimeRevisionSource {
  readonly revision: number;
}

export interface RuntimeOperationGuard {
  readonly revision: number;

  isInterrupted(): boolean;
}

export type RuntimeOperationResult<TValue> =
  | {
      readonly type: 'completed';
      readonly value: TValue;
    }
  | {
      readonly error: unknown;
      readonly type: 'failed';
    }
  | {
      readonly error: unknown;
      readonly type: 'interrupted';
    };

export const createRuntimeRevisionGuard = (source: RuntimeRevisionSource): RuntimeOperationGuard => {
  const revision = source.revision;

  return {
    isInterrupted: () => source.revision !== revision,
    revision,
  };
};

export const executeRuntimeOperation = async <TValue>(
  guard: RuntimeOperationGuard | null,
  operation: () => TValue | Promise<TValue>,
): Promise<RuntimeOperationResult<TValue>> => {
  try {
    return {
      type: 'completed',
      value: await operation(),
    };
  } catch (error) {
    if (guard?.isInterrupted()) {
      return {
        error,
        type: 'interrupted',
      };
    }

    return {
      error,
      type: 'failed',
    };
  }
};
