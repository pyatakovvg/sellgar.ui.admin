import { Injectable } from '../../../di/injection/decorators';

import {
  RuntimeErrorsInterface,
  type RuntimeErrorHandler,
  type RuntimeErrorPredicate,
} from './runtime-errors.interface.ts';

interface RuntimeErrorSubscription<TError = unknown> {
  readonly handler: RuntimeErrorHandler<TError>;
  readonly predicate: RuntimeErrorPredicate<TError>;
}

@Injectable()
export class RuntimeErrors extends RuntimeErrorsInterface {
  private readonly listeners = new Set<RuntimeErrorHandler>();
  private readonly subscriptions = new Set<RuntimeErrorSubscription>();

  async emit(error: unknown): Promise<void> {
    const handlers: Promise<void>[] = [];

    for (const listener of this.listeners) {
      handlers.push(Promise.resolve(listener(error)));
    }

    for (const subscription of this.subscriptions) {
      if (subscription.predicate(error)) {
        handlers.push(Promise.resolve(subscription.handler(error)));
      }
    }

    await Promise.all(handlers);
  }

  on<TError>(
    errorTypeOrPredicate: RuntimeErrorPredicate<TError> | (new (...args: any[]) => TError),
    handler: RuntimeErrorHandler<TError>,
  ): () => void {
    const predicate = isClassConstructor(errorTypeOrPredicate)
      ? (error: unknown): error is TError => error instanceof errorTypeOrPredicate
      : errorTypeOrPredicate;
    const subscription: RuntimeErrorSubscription<TError> = {
      handler,
      predicate,
    };

    this.subscriptions.add(subscription as RuntimeErrorSubscription);

    return () => {
      this.subscriptions.delete(subscription as RuntimeErrorSubscription);
    };
  }

  subscribe(handler: RuntimeErrorHandler): () => void {
    this.listeners.add(handler);

    return () => {
      this.listeners.delete(handler);
    };
  }
}

const isClassConstructor = <TValue>(value: unknown): value is new (...args: any[]) => TValue => {
  if (!value || typeof value !== 'function') {
    return false;
  }

  if (value === Error || value.prototype instanceof Error) {
    return true;
  }

  const source = Function.prototype.toString.call(value);

  return source.startsWith('class ');
};
