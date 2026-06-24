export abstract class ProcessStoreInterface {
  abstract inProcess: boolean;

  abstract setProcess(state: boolean): void;
}
