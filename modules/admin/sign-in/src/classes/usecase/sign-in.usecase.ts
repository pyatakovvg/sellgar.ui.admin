import { AuthService, AuthServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStore, FormStoreSymbol } from '../store/form.store.ts';

export const SignInUseCaseSymbol = Symbol.for('SignInUseCase');

@injectable()
export class SignInUseCase {
  constructor(
    @inject(FormStoreSymbol) private readonly formStore: FormStore,
    @inject(AuthServiceSymbol) private readonly authService: AuthService,
  ) {}

  async execute(email: string, password: string): Promise<boolean> {
    this.formStore.setProcess(true);

    try {
      await this.authService.signIn(email, password);
      return true;
    } catch (error) {
      return false;
    } finally {
      this.formStore.setProcess(false);
    }
  }
}
