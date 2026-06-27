import React from 'react';

import type { DependencyToken } from '../../di/token/dependency-token';
import { RuntimeErrorsInterface, type RuntimeErrorConstructor, type RuntimeErrorHandler } from '../errors';

import type { RuntimeScopeInterface } from '../scope/contract';

const RuntimeScopeContext = React.createContext<RuntimeScopeInterface | null>(null);

export interface RuntimeScopeProviderProps {
  readonly children: React.ReactNode;
  readonly scope: RuntimeScopeInterface;
}

export const RuntimeScopeProvider: React.FC<RuntimeScopeProviderProps> = ({ children, scope }) => {
  return <RuntimeScopeContext.Provider value={scope}>{children}</RuntimeScopeContext.Provider>;
};

export const useRuntimeScope = (): RuntimeScopeInterface => {
  const scope = React.useContext(RuntimeScopeContext);

  if (scope === null) {
    throw new Error('Runtime scope недоступен.');
  }

  return scope;
};

export const useDependency = <TValue,>(token: DependencyToken<TValue>): TValue => {
  return useRuntimeScope().get(token);
};

export const useRuntimeErrors = (): RuntimeErrorsInterface => {
  return useDependency(RuntimeErrorsInterface);
};

export const useRuntimeError = <TError extends Error>(
  errorType: RuntimeErrorConstructor<TError>,
  handler: RuntimeErrorHandler<TError>,
): void => {
  const errors = useRuntimeErrors();

  React.useEffect(() => {
    return errors.on(errorType, handler);
  }, [errorType, errors, handler]);
};

export type RuntimeOperation = <TValue>(operation: () => TValue | Promise<TValue>) => Promise<TValue>;

export const useRuntimeOperation = (): RuntimeOperation => {
  const errors = useRuntimeErrors();

  return React.useCallback(
    async <TValue,>(operation: () => TValue | Promise<TValue>): Promise<TValue> => {
      try {
        return await operation();
      } catch (error) {
        await errors.emit(error);
        throw error;
      }
    },
    [errors],
  );
};
