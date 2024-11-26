import { inject, injectable } from 'inversify';

import { SignInUseCase, SignInUseCaseSymbol } from '../usecase/sign-in.usecase.ts';

export const SignInPresenterSymbol = Symbol.for('SignInPresenter');

@injectable()
export class SignInPresenter {
  constructor(@inject(SignInUseCaseSymbol) private readonly signInUseCase: SignInUseCase) {}

  async signIn(email: string, password: string) {
    return await this.signInUseCase.execute(email, password);
  }
}
