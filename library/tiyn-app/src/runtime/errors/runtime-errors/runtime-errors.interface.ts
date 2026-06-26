import type { DependencyConstructor } from '../../../di/binding/binding-builder';

export type RuntimeErrorHandler<TError = unknown> = (error: TError) => void | Promise<void>;
export type RuntimeErrorPredicate<TError = unknown> = (error: unknown) => error is TError;

export abstract class RuntimeErrorsInterface {
  abstract emit(error: unknown): Promise<void>;

  abstract on<TError>(
    errorType: DependencyConstructor<TError>,
    handler: RuntimeErrorHandler<TError>,
  ): () => void;

  abstract on<TError>(predicate: RuntimeErrorPredicate<TError>, handler: RuntimeErrorHandler<TError>): () => void;

  abstract subscribe(handler: RuntimeErrorHandler): () => void;
}
