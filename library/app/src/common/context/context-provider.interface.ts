export abstract class ContextProviderInterface {
  abstract bind<T>(key: T, context: T): void;
  abstract get<T>(key: T): T;
}
