export abstract class ConfigInterface {
  abstract get<T extends Window['env'], K extends keyof T>(key: K): T[K];
}
