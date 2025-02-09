import { HttpException } from '@library/domain';

export abstract class FormStoreInterface {
  abstract inProcess: boolean;
  abstract error: HttpException | null;

  abstract setProcess(state: boolean): void;
  abstract setError(error: HttpException | null): void;

  abstract execute(email: string, password: string): Promise<boolean>;
}
