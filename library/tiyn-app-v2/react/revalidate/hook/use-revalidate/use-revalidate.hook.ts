import React from 'react';

import type { DependencyToken } from '../../../../core/di/token/dependency-token';
import { useControllerRuntime } from '../../../controller/runtime/controller-runtime-context';

export type RevalidateHandler = (() => Promise<void>) & {
  readonly error: unknown;
  readonly inProcess: boolean;
};

export const useRevalidate = (controllerToken?: DependencyToken<unknown>): RevalidateHandler => {
  const runtime = useControllerRuntime();
  const sessionRef = React.useRef<AbortController | null>(null);
  const [inProcess, setInProcess] = React.useState(false);
  const [error, setError] = React.useState<unknown>(undefined);
  const revision = React.useSyncExternalStore(
    React.useCallback((listener) => runtime.subscribe(listener), [runtime]),
    React.useCallback(() => runtime.getRevalidateRevision(), [runtime]),
    React.useCallback(() => runtime.getRevalidateRevision(), [runtime]),
  );
  const runtimeState = React.useMemo(
    () => runtime.getRevalidateState(controllerToken),
    [controllerToken, revision, runtime],
  );

  React.useEffect(() => {
    return () => {
      sessionRef.current?.abort();
      sessionRef.current = null;
    };
  }, []);

  const revalidate = React.useCallback(async () => {
    if (sessionRef.current || runtime.getRevalidateState(controllerToken).inProcess) {
      throw new Error('Обновление контроллера уже выполняется.');
    }

    const abortController = new AbortController();

    sessionRef.current = abortController;
    setError(undefined);
    setInProcess(true);

    try {
      await runtime.revalidate({
        controllerToken,
        signal: abortController.signal,
      });
    } catch (cause) {
      if (sessionRef.current === abortController) {
        setError(cause);
      }

      throw cause;
    } finally {
      if (sessionRef.current === abortController) {
        sessionRef.current = null;
        setInProcess(false);
      }
    }
  }, [controllerToken, runtime]);

  return React.useMemo(
    () =>
      Object.assign(revalidate, {
        error: runtimeState.error ?? error,
        inProcess: runtimeState.inProcess || inProcess,
      }) as RevalidateHandler,
    [error, inProcess, revalidate, runtimeState.error, runtimeState.inProcess],
  );
};
