export abstract class FormStoreInterface {
  abstract inProcess: boolean;

  abstract setProcess(state: boolean): void;
}
