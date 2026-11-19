import type { SignInInput } from '../input/sign-in.input.ts';

export class SignInMapper {
  static toAuthCredentials(input: SignInInput) {
    return {
      email: input.login,
      password: input.password,
    };
  }
}
