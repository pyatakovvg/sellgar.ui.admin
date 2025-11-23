import { FormStoreInterface } from '../store/form-store.interface.ts';

export abstract class SignInControllerInterface {
  abstract readonly formStore: FormStoreInterface;

  abstract signIn(email: string, password: string): Promise<void>;
}
